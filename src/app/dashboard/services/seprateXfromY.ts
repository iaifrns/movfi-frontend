export const seperateXfromY = (data:Record<string, number>)=>{
    const newArr = Object.keys(data)
    const x_axis=[]
    const  y_axis = []
    for (let i=0;i<newArr.length; i++){
        if(newArr[i].includes('x')){
            x_axis.push(newArr[i])
        }else{
            y_axis.push(newArr[i])
        }
    }
    return {x_axis, y_axis}
}