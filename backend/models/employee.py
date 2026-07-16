class Employee:
    def __init__(
        self,
        id=None,
        employee_id=None,
        user_id=None,
        department_id=None,
        designation=None,
        joining_date=None,
        salary=None,
        status="Active"
    ):
        self.id = id
        self.employee_id = employee_id
        self.user_id = user_id
        self.department_id = department_id
        self.designation = designation
        self.joining_date = joining_date
        self.salary = salary
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "user_id": self.user_id,
            "department_id": self.department_id,
            "designation": self.designation,
            "joining_date": self.joining_date,
            "salary": self.salary,
            "status": self.status
        }