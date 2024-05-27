import './style.css'

const SmartButton = ({children, action, styleState}) => {
  return (
    <button className={`btn ${styleState}`} onClick={action}>
        {children}
    </button>
  )
}

export default SmartButton