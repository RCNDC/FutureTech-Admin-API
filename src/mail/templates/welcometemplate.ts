export default function WelcomeTemplate(content:{ticket:string, eventName:string, location:string, days:string, time:string}){
    return(
        `
        <p style="line-height: 1.625; margin-bottom: 1.5rem; margin-top: 0;">
            Welcome to ${content.eventName}! We're so excited to see you here. Your ${content.ticket} is all set. 
            Get ready for a fantastic ${content.days} in ${content.location}. 
            Enjoy the event!
        </p>
        <span>Future Tech Addis Team</span>
        `
    )
}