class Leave:
    def __init__(
        self,
        id=None,
        employee_id=None,
        leave_type=None,
        start_date=None,
        end_date=None,
        reason=None,
        status="Pending"
    ):
        self.id = id
        self.employee_id = employee_id
        self.leave_type = leave_type
        self.start_date = start_date
        self.end_date = end_date
        self.reason = reason
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "leave_type": self.leave_type,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "reason": self.reason,
            "status": self.status
        }