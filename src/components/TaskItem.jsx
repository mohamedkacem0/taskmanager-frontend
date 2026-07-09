function TaskItem({ task, onToggle, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded mb-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task)}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
        <span
          className={`text-white ${isCompleted ? 'line-through text-slate-500' : ''}`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-300 text-sm"
      >
        Eliminar
      </button>
    </div>
  );
}

export default TaskItem;