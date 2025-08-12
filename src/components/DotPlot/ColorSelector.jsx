function ColorSelector({ onChange }) {
  return (
    <div className="field">
      <label className="label">表示するパフォーマンス</label>
      <div className="control">
        <div className="select">
          <select defaultValue="表示しない" onChange={(e) => onChange(e.target.value)}>
            <option value={null}>表示しない</option>
            <option value="rgb(255,178,178)">赤（2800）</option>
            <option value="rgb(255,216,178)">橙（2400）</option>
            <option value="rgb(236,236,178)">黄（2000）</option>
            <option value="rgb(178,178,255)">青（1600）</option>
            <option value="rgb(178,236,236)">水色（1200）</option>
            <option value="rgb(178,216,178)">緑（800）</option>
          </select>
        </div>
      </div>
    </div >
  )
}

export default ColorSelector;