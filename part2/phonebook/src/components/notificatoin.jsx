const Notification = ({is_success, message}) => {
    if(message == null) return null
    return <div className={is_success ? 'success' : 'error'}>{message}</div>
}

export default Notification