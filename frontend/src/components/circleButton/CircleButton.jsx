import './style.css'

const CircleButton = ({children, action, styleState}) => {
  return (
    <button className={`circleButton ${styleState}`} onClick={action}>
        {children}
    </button>
  )
}

export default CircleButton