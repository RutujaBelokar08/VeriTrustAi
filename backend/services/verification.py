import re
import ssl
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from typing import Any, Dict, List, Optional
from urllib.parse import urljoin, urlparse


VALID_SCHEMES = {"http", "https"}
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36"


class MetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.description = ""
        self.links: List[str] = []
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: List[tuple[str, str]]):
        attrs_dict = dict(attrs)
        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            key = attrs_dict.get("name", "").lower() or attrs_dict.get("property", "").lower()
            if key in {"description", "og:description", "twitter:description"} and not self.description:
                self.description = attrs_dict.get("content", "").strip()
        elif tag == "a":
            href = attrs_dict.get("href", "").strip()
            if href:
                self.links.append(href)

    def handle_endtag(self, tag: str):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str):
        if self._in_title:
            self.title += data.strip()


def validate_url(value: str) -> Optional[str]:
    if not isinstance(value, str):
        return "Invalid URL"

    candidate = value.strip()
    if not candidate:
        return "Invalid URL"

    parsed = urlparse(candidate)
    if parsed.scheme not in VALID_SCHEMES or not parsed.netloc:
        return "Invalid URL"

    if not re.search(r"\.[a-zA-Z]{2,}", parsed.netloc):
        return "Invalid URL"

    return None


def is_reachable(url: str) -> bool:
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=8, context=ssl.create_default_context()) as resp:
            return 200 <= resp.status < 500
    except urllib.error.HTTPError as error:
        return 200 <= error.code < 500
    except Exception:
        return False


def fetch_site_metadata(url: str) -> Dict[str, Any]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=12, context=ssl.create_default_context()) as response:
            status = response.status
            if status >= 500:
                return {"error": "Website returned server error", "status_code": status}

            body = response.read(200000).decode("utf-8", errors="ignore")
            print("=" * 50)
            print(body[:1000])
            print("=" * 50)
            parser = MetadataParser()
            parser.feed(body)
            about_links = [link for link in parser.links if "about" in link.lower()]
            contact_links = [link for link in parser.links if "contact" in link.lower() or "mailto:" in link.lower()]

            return {
                "title": parser.title.strip(),
                "description": parser.description.strip(),
                "https": url.startswith("https://"),
                "ssl_valid": url.startswith("https://"),
                "domain_age": None,
                "contact_info": contact_links,
                "about_page": bool(about_links),
                "registration_identifiers": [],
                "public_info_found": bool(parser.title.strip() or parser.description.strip() or about_links or contact_links),
                "status_code": status,
            }
    except urllib.error.HTTPError as error:
        if 400 <= error.code < 500:
            return {"error": "Website returned client error", "status_code": error.code}
        return {"error": "Website returned server error", "status_code": error.code}
    except (urllib.error.URLError, ssl.SSLError) as error:
        return {"error": str(error)}
    except Exception as error:
        return {"error": "Unable to fetch website metadata", "detail": str(error)}


def normalize_metadata(raw: Dict[str, Any]) -> Dict[str, Any]:
    title = (raw.get("title") or "").strip()
    description = (raw.get("description") or "").strip()
    https = bool(raw.get("https", False))
    ssl_valid = bool(raw.get("ssl_valid", False))
    domain_age = raw.get("domain_age")
    contacts = [item.strip() for item in raw.get("contact_info") or [] if str(item).strip()]
    about_page = bool(raw.get("about_page", False))
    registration_ids = [item.strip() for item in raw.get("registration_identifiers") or [] if str(item).strip()]
    return {
        "title": title,
        "description": description,
        "https": https,
        "ssl_valid": ssl_valid,
        "domain_age": domain_age,
        "contact_info": contacts,
        "about_page": about_page,
        "registration_identifiers": registration_ids,
    }


def analyze_site(metadata: Dict[str, Any]) -> Dict[str, Any]:
    evidence = normalize_metadata(metadata)
    public_info = bool(metadata.get("public_info_found", False))

    positive_signals = []
    warnings = []
    missing_information = []

    score = 0

    # HTTPS
    if evidence["https"]:
        score += 20
        positive_signals.append("HTTPS is enabled")
    else:
        warnings.append("Website is not using HTTPS")

    # SSL
    if evidence["ssl_valid"]:
        score += 15
        positive_signals.append("Valid SSL certificate detected")

    # Title
    if evidence["title"]:
        score += 15
        positive_signals.append("Website title found")
    else:
        missing_information.append("Website title missing")

    # Description
    if evidence["description"]:
        score += 15
        positive_signals.append("Website description found")
    else:
        missing_information.append("Website description missing")

    # About Page
    if evidence["about_page"]:
        score += 10
        positive_signals.append("About page available")
    else:
        warnings.append("About page not found")

    # Contact
    if evidence["contact_info"]:
        score += 15
        positive_signals.append("Contact information available")
    else:
        warnings.append("Contact information missing")

    # Registration IDs (optional, not mandatory)
    if evidence["registration_identifiers"]:
        score += 10
        positive_signals.append("Registration information detected")
    else:
        warnings.append("Registration information not detected")

    # Domain age (optional)
    if evidence["domain_age"] is not None:
        if evidence["domain_age"] > 365:
            score += 10
            positive_signals.append("Domain has been active for over one year")
        else:
            warnings.append("Domain is relatively new")

    score = max(0, min(score, 100))

    # ------------------------
    # VERIFIED
    # ------------------------
    if score >= 60:
        return {
            "status": "verified",
            "title": "Verification Successful",
            "summary": "The website appears trustworthy based on publicly available information.",
            "score": score,
            "confidence": "High",
            "recommendation": "This organization appears credible based on available evidence.",
            "positive_signals": positive_signals,
            "warnings": warnings,
            "missing_information": missing_information,
            "evidence": evidence,
            "reason": [],
        }

    # ------------------------
    # PARTIAL
    # ------------------------
    elif score >= 35:
        return {
            "status": "partial",
            "title": "Partial Verification",
            "summary": "Some credibility signals were found, but more evidence is required.",
            "score": score,
            "confidence": "Medium",
            "recommendation": "Review the NGO manually before donating.",
            "positive_signals": positive_signals,
            "warnings": warnings,
            "missing_information": missing_information,
            "evidence": evidence,
            "reason": [],
        }

    # ------------------------
    # UNABLE
    # ------------------------
    else:
        return {
            "status": "unable",
            "title": "Unable to Verify",
            "summary": "There was not enough publicly available information to confidently verify this organization.",
            "score": None,
            "confidence": "Low",
            "recommendation": "Proceed carefully and verify the organization manually.",
            "positive_signals": positive_signals,
            "warnings": warnings,
            "missing_information": missing_information,
            "evidence": evidence,
            "reason": [
                "Insufficient publicly available evidence."
            ],
        }
