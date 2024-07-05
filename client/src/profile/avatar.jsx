import React from 'react'

const Avatar = ({url, title, propsStyle, propsTitleStyle}) => {
  return (
    <div className='avatar-box' style={{...styles.avatarBox,...propsStyle,}}>
        {url?<img src={url} alt='avatar' style={styles.imageStyle} />:<p style={{...styles.titleStyle, ...propsTitleStyle}}>{title}</p>}
    </div>
  )
}

export default Avatar;

const styles={
    avatarBox:{
        width:"50px",
        height:"50px",
        border:"0.5px solid lightgrey",
        borderRadius:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    },
    imageStyle:{
        width:"100%",
        height:"100%", 
        margin:"1px"
    },
    titleStyle:{
        width:"100%",
        height:"100%", 
        margin:"1px",
        fontSize:"1rem",
        fontWeight:"600",
        fontFamily:"sans-serif",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    }
}