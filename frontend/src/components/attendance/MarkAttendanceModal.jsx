import AddAttendanceModal from "./AddAttendanceModal";

function MarkAttendanceModal(props) {
  return (
    <AddAttendanceModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAddAttendance={props.onAddAttendance}
      employees={props.employees}
    />
  );
}

export default MarkAttendanceModal;