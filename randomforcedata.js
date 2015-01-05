    function randomForceData(count) {
      var forceData = {};
      var nodeArray = [],
          edgesArray = [];
      for(i = 0; i < count; i++){
        var o = { name: "node" + i }
        nodeArray.push(o)
      }
      for(i = 0; i < count; i++){
        var s = Math.floor(Math.random()*count);
        var t = Math.floor(Math.random()*count);

        if(s == t) {
          if(s == (count - 1)) s = 0;
          s = s + 1;
        }
        o = {source: s, target: t}
        edgesArray.push(o);
      }
      forceData.edges = edgesArray;
      forceData.nodes = nodeArray;
  
      return forceData
    }