import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const alertStyles = {
  success: {
    base: 'bg-green-100 text-green-800 border-green-300',
    icon: faCheckCircle,
  },
  error: {
    base: 'bg-red-100 text-red-800 border-red-300',
    icon: faTimesCircle,
  },
  warning: {
    base: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: faExclamationTriangle,
  },
  info: {
    base: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: faInfoCircle,
  },
};

export default function AlertCard({ type = 'info', message, onClose }) {
  const style = alertStyles[type] || alertStyles.info;

  return (
    <div className={`p-4 w-full my-2 rounded-md relative ${style.base} max-w-7xl`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={style.icon} className="h-5 w-5 mt-0.5" />
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-inherit hover:opacity-70">
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
