JSON.stringify({ name: "aaa", age: 12 }, function (key, value) {
    switch (key) {
        case "name": return 'xx';
        default: return value;
    }

}, 8)

eval("({\"name\":\"iskeeping\"})")

new Function("", "return ({\"name\":\"iskeeping\"})")()

JSON.parse("{\"name\":\"iskeeping\"}")