import React from 'react'

export const Welcome = () => {
    return (
        <section className="welcome">
            <div className="dark-bg">
                <div className="welcome-inner">
                    <h1>Welcome to Glammed</h1>
                    <p>
                        Create a beautician profile - share your work and get noticed by potential customers
                    </p>
                    <div>
                        <a href="#">Sign Up</a>
                        <a href="#">Login</a>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default Welcome;