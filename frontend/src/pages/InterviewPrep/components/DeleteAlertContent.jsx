const DeleteAlertContent = ({ onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">Are you sure you want to delete this session?</p>

      <div className="flex justify-end mt-6 items-center">
        <button type="button" className="btn-small" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteAlertContent;
