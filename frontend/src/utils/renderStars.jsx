import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const renderStars = (avaliation) => {
        const arr = []

        if(avaliation > 5){
            avaliation = 5
        }

        for(let i = 0; i < avaliation; i++){
            arr.push(<StarIcon key={i}/>)
        }

        if(avaliation < 5){
            const difference = 5 - avaliation
            for(let i = 0; i < difference;i++){
                arr.push(<StarBorderIcon key={i+4} />)
            }
        }

        return arr
}