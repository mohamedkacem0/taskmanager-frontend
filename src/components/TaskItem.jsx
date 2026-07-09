import { Trash2, Check } from 'lucide-react';

function TaskItem({ task, onToggle, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div className="group flex items-center justify-between bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 px-4 py-3.5 rounded-xl mb-2 transition">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onToggle(task)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
            isCompleted
              ? 'bg-blue-600 border-blue-600'
              : 'border-slate-500 hover:border-blue-400'
          }`}
        >
          {isCompleted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </button>
        <span
          className={`text-sm truncate ${
            isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default TaskItem;