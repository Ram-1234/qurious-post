import React from 'react'

const RecommendeUsers = ({users}) => {
  return (
    <div className='recommend-users'>
        {users && users.map((item,index)=>{
            return(
                <div>
                    <h1>Hello</h1>
                </div>
            )
        }) }
    </div>
  )
}

export default RecommendeUsers;