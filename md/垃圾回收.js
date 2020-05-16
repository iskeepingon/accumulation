//循环引用的问题
function circleUseProbem(){
  let objectA = new Object()
  let objectB = new Object()

  objectA.someOtherObject = objectB
  objectB.anotherObject = objectA
}