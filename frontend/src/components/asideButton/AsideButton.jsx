import './style.css'
import CircleButton from '../circleButton/CircleButton'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { backForm, nextForm, backAnimation, nextAnimation } from '../../redux/loginAnimationSlice';

// eslint-disable-next-line react/prop-types
const AsideButton = ({ action }) => {
  const { formStage } = useSelector(state => state.loginAnimation)
  const dispatch = useDispatch()

  const resetChecked = () => {
    let isCheked = Array.from(document.querySelectorAll(".checked"))
    
    for(let active of isCheked){
      active.classList.remove("checked")
    }
  }

  const nextFormStage = async () => {
    const auth = action()
    if(formStage < 4 && auth){
      dispatch(nextForm())
      dispatch(nextAnimation())
      resetChecked()
    }
  }
  
  const backFormStage = () => {
    dispatch(backAnimation())
    dispatch(backForm())
  }

  return (
    <aside className="asideButtonContainer">
        <CircleButton styleState='darkButton' action={() => backFormStage()}>
            <ArrowBackIosRoundedIcon />
        </CircleButton>
        <div className="row">
            <CircleIcon style={{"color": formStage === 1 ? "#1c1c1c": "#57DC74"}}/>
            <CircleIcon style={{"color": formStage === 1 ? "#c1c1c1" : formStage === 2 ? "#1c1c1c": "#57DC74"}}/>
        </div>
        <CircleButton styleState='darkButton' action={() => nextFormStage()}>
            <ArrowForwardIosRoundedIcon />
        </CircleButton>
    </aside>
  )
}

export default AsideButton