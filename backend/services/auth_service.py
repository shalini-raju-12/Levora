import logging
from database.db import supabase

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AuthService:

    @staticmethod
    def signup(email, password):
        try:
            logger.info(f"Signup attempt for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'}")
            
            response = supabase.auth.sign_up({
                "email": email,
                "password": password
            })
            
            logger.info(f"Signup successful for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'}")
            logger.debug(f"Signup response user: {response.user.id if hasattr(response.user, 'id') else 'N/A'}")
            
            return {
                "success": True,
                "message": "User created successfully",
                "data": {
                    "user": response.user.model_dump() if hasattr(response.user, 'model_dump') else response.user,
                    "access_token": response.session.access_token if response.session else None,
                    "refresh_token": response.session.refresh_token if response.session else None
                }
            }
        except Exception as e:
            error_message = str(e)
            logger.error(f"Signup failed for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'} - Error: {error_message}")
            
            # Check for email confirmation error
            if "Email not confirmed" in error_message or "email confirmation" in error_message.lower():
                return {
                    "success": False,
                    "message": "Email not confirmed. Please check your email for the confirmation link."
                }
            
            return {
                "success": False,
                "message": f"Error creating user: {error_message}"
            }

    @staticmethod
    def login(email, password):
        try:
            logger.info(f"Login attempt for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'}")
            
            response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            
            logger.info(f"Login successful for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'}")
            logger.debug(f"Login response user: {response.user.id if hasattr(response.user, 'id') else 'N/A'}")
            
            return {
                "success": True,
                "message": "Login successful",
                "data": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                    "user": response.user.model_dump() if hasattr(response.user, 'model_dump') else response.user
                }
            }
        except Exception as e:
            error_message = str(e)
            logger.error(f"Login failed for email: {email[:3]}***@{email.split('@')[1] if '@' in email else 'unknown'} - Error: {error_message}")
            
            # Check for email confirmation error
            if "Email not confirmed" in error_message or "email confirmation" in error_message.lower():
                return {
                    "success": False,
                    "message": "Email not confirmed. Please check your email for the confirmation link."
                }
            
            # Check for invalid credentials
            if "Invalid login credentials" in error_message or "invalid credentials" in error_message.lower():
                return {
                    "success": False,
                    "message": "Invalid email or password."
                }
            
            return {
                "success": False,
                "message": f"Error logging in: {error_message}"
            }
