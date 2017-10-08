module.exports = {
    format(value){
        var result = value;
        let linkReg = /\[\[(.+?)\]\]/g;
        if (value.match(linkReg)) {
            value.match(linkReg).forEach(function (element, index) {
    
            var dest = element.replace('[[', '').replace(']]', ''); //去掉[[]]
            var destType = 'a';
            var destProp = 'href';
            var destLink = '/wiki/s/' + dest;
            var destName = dest;
    
            /* Alias name */
            if (dest.search(/\|/) > 0) {
              destLink = '/wiki/s/' + dest.split('|')[0];
              destName = dest.split('|')[1];
            }
    
            dest = '<' + destType + ' ' + destProp + '="' + destLink + '">' + destName + '</a>';
    
            // console.log('---------');
            // console.log(index)
            // console.log("link:" + dest);
    
            result = result.replace(element, dest)
          }, this);
        }
        return result;
    }
}