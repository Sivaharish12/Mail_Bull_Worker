const MailQueue=require('../initializer/queue_initializer')

const options={
    delay:1000,
    attempts:5
};

async function add_work(email){
    const data={
        email:email
    };
    
    await MailQueue.mailQueue.add(data,options);
    console.log("The data is ",data);
    console.log("Total jobs remaining",
    await MailQueue.mailQueue.getJobCounts() );

}

module.exports=add_work;