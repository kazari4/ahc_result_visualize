function UserNameInput({ onChange }) {
  return (
    <div className="control">
      <input className="input" type="text" placeholder="Enter UserName" onChange={e => onChange(e.target.value)} />
    </div>
  )
}

export default UserNameInput;