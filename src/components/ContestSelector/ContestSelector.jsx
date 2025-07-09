function ContestSelector({ selectedContest, onChange }) {
  return (
    <div className="control">
      <div className="select">
        <select value={selectedContest} onChange={e => onChange(e.target.value)}>
          {Array.from({ length: 50 }, (_, i) => {
            const num = (50 - i).toString().padStart(3, '0');
            return (
              <option key={num} value={`ahc${num}`}>
                AHC{num}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  )
}
export default ContestSelector;