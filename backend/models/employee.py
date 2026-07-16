class Employee:
    def __init__(
        self,
        id=None,
        user_id=None,
        employee_id=None,
        first_name=None,
        last_name=None,
        email=None,
        phone=None,
        gender=None,
        department_id=None,
        designation=None,
        joining_date=None,
        salary=None,
        status="Active"
    ):
        self.id = id
        self.user_id = user_id
        self.employee_id = employee_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.gender = gender
        self.department_id = department_id
        self.designation = designation
        self.joining_date = joining_date
        self.salary = salary
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "employee_id": self.employee_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "gender": self.gender,
            "department_id": self.department_id,
            "designation": self.designation,
            "joining_date": self.joining_date,
            "salary": self.salary,
            "status": self.status
        }