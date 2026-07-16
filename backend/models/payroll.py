class Payroll:
    def __init__(
        self,
        id=None,
        employee_id=None,
        basic_salary=None,
        allowance=0,
        deduction=0,
        net_salary=None,
        pay_month=None
    ):
        self.id = id
        self.employee_id = employee_id
        self.basic_salary = basic_salary
        self.allowance = allowance
        self.deduction = deduction
        self.net_salary = net_salary
        self.pay_month = pay_month

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "basic_salary": self.basic_salary,
            "allowance": self.allowance,
            "deduction": self.deduction,
            "net_salary": self.net_salary,
            "pay_month": self.pay_month
        }