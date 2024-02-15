const MailQueue=require('../initializer/queue_initializer')
const nodemailer=require('nodemailer')


MailQueue.mailQueue.process(async job=> {
    console.log("Total jobs remaining",
    await MailQueue.mailQueue.getJobCounts() );
    return await sendmail(job.data.email);
});

// Event listener for failed attempts
MailQueue.mailQueue.on('failed', async(job, err) => {
    const options={
        delay:1000,
        attempts:1
    };
    const data={
        email:"harishsiva2141@gmail.com"
    };
    await MailQueue.failQueue.add(data,options);
   
});

function sendmail(email){
    return new Promise((resolve,resject)=>{
        let mailOptions={
            from:'harishsiva2141@gmail.com',
            to:email,
            subject:'Verification',
            html: '<div><h2>Click here to <a href="http://localhost:5000/user/email/' + email + '">verify</a></h2></div>'
};

        let mailconfig={
            service:'gmail',
            auth:{
                user:'harishsiva2141@gmail.com',
                pass:'ngto cqpq lctg skdg'
            }
        };

        nodemailer.createTransport(mailconfig).sendMail(mailOptions,(err,info)=>{
            if(err) console.log(err);
            else console.log(info);
        })

    })
}



MailQueue.failQueue.process(async job=>{
    return await sendmail(job.data.email)
})

function sendmail(email){
    return new Promise((resolve,resject)=>{
        let mailOptions={
            from:'harishsiva2141@gmail.com',
            to:'harishsiva24112002@gmail.com',
            subject:'Error',
            text:"error happened"
        };

        let mailconfig={
            service:'gmail',
            auth:{
                user:'harishsiva2141@gmail.com',
                pass:'ngto cqpq lctg skdg'
            }
        };

        nodemailer.createTransport(mailconfig).sendMail(mailOptions,(err,info)=>{
            if(err) console.log(err);
            else console.log(info);
        })

    })
}