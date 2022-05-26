import React from 'react'
const websiteName="Direct"
const Statment=` Be productive with ${websiteName}`
export default function LoginLeft() {
  return (
    <div className="loginLeft">
        <h3 className="loginLogo">{websiteName}</h3>
        <span className="loginDesc">
        {Statment}
        </span>
    </div>
  )
}
