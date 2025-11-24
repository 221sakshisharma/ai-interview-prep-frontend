const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='flex flex-col p-5 space-y-5'>
        <h1 className='text-sm'>
            {content}
        </h1>


        <button 
        className='ml-auto bg-linear-to-r from-red-500 to-red-600 text-sm font-semibold tracking-wide text-white px-6 py-2.5 rounded-lg cursor-pointer'
        onClick={onDelete}>
            Delete
        </button>
    </div>
  )
}

export default DeleteAlertContent