let args=process.argv.slice(2)
args=args*2
let num=args/2
let num2=1
for(let i=1;i<=args;i++)
{
    let space=""
    let star=""
    for(let j=1;j<=num;j++)
    {
        space=space.concat(" ")
    }
    for(let k=1;k<=num2;k++)
    {
        star=star.concat("* ")
    }
    if(i=== (args/2))
    {
        
    }
    else if(i>(args/2))
    {
        num=num+1
        num2=num2-1
    }
    else
    {
        num=num-1
        num2=num2+1
    }
    space=space.concat(star)
    console.log(space)
}