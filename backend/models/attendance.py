class Attendance:
    def __init__(
        self,
        id=None,
        employee_id=None,
        attendance_date=None,
        check_in=None,
        check_out=None,
        work_hours=None,
        status="Present",
        created_at=None
    ):
        self.id = id
        self.employee_id = employee_id
        self.attendance_date = attendance_date
        self.check_in = check_in
        self.check_out = check_out
        self.work_hours = work_hours
        self.status = status
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "attendance_date": self.attendance_date,
            "check_in": self.check_in,
            "check_out": self.check_out,
            "work_hours": self.work_hours,
            "status": self.status,
            "created_at": self.created_at
        }