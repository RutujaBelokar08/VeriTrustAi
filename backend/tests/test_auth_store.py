import os
import tempfile
import unittest

from auth_store import authenticate_user, create_user, init_db


class AuthStoreTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.db_path = os.path.join(self.temp_dir.name, "test-users.db")
        os.environ["VERITRUST_DB_PATH"] = self.db_path
        init_db()

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_user_can_sign_up_and_login(self):
        created = create_user("demo", "SecurePass123!", "user")
        self.assertTrue(created["success"])

        authenticated = authenticate_user("demo", "SecurePass123!")
        self.assertTrue(authenticated["success"])
        self.assertEqual(authenticated["role"], "user")

        wrong_password = authenticate_user("demo", "wrong")
        self.assertFalse(wrong_password["success"])


if __name__ == "__main__":
    unittest.main()
