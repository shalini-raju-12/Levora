class Attendance:
    def __init__(
        self,
        id=None,
        employee_id=None,
        attendance_date=None,
        check_in=None,
        check_out=None,
        status="Present"
    ):
        self.id = id
        self.employee_id = employee_id
        self.attendance_date = attendance_date
        self.check_in = check_in
        self.check_out = check_out
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "attendance_date": self.attendance_date,
            "check_in": self.check_in,
            "check_out": self.check_out,
            "status": self.status
        }