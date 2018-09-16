function LoadSnap() {
  var s = Snap('#diagram');
  var all = s.selectAll('g');
  
  // Hover for load balancer
  var proxyGroup = s.select('g[id="LoadBalancer"]')
  proxyGroup.selectAll('path').attr({fill: '#fff'})
  proxyGroup.hover(
    function(){
      all.exclude(this);
      all.animate({opacity: '0.2'}, 180);      
      document.querySelector('.proxy').classList.add('proxy--active')
    },
    function(){
      all.push(this);
      all.animate({opacity: 1.0}, 180);
      document.querySelector('.proxy').classList.remove('proxy--active')
    });
  // Hover for app server containers
  var c1 = s.select('g[id="Container-1"]');
  var c2 = s.select('g[id="Container-2"]'); 
  var containerGroup = s.group(c1, c2);
  containerGroup.selectAll('path').attr({fill: '#fff'})
  containerGroup.hover(
    function(){
      all.exclude(c1);
      all.exclude(c2);
      all.animate({opacity: '0.2'}, 180);             
      document.querySelector('.container').classList.add('container--active')
    },
    function(){
      all.push(c1);
      all.push(c2);
      all.animate({opacity: 1.0}, 180);
      document.querySelector('.container').classList.remove('container--active')
  });
  // Hover for static files
  var h1 = s.select('g[id="HTML-1"]');
  var h2 = s.select('g[id="HTML-2"]'); 
  var htmlGroup = s.group(h1, h2);
  htmlGroup.selectAll('path').attr({fill: '#fff'})
  htmlGroup.hover(
    function(){
      all.exclude(h1);
      all.exclude(h2);
      all.animate({opacity: '0.2'}, 180);             
      document.querySelector('.static').classList.add('static--active')
    },
    function(){
      all.push(h1);
      all.push(h2);
      all.animate({opacity: 1.0}, 180);
      document.querySelector('.static').classList.remove('static--active')
  });
  // Hover for load balancer
  var bucketGroup = s.select('g[id="S3Bucket"]')
  bucketGroup.selectAll('path').attr({fill: '#fff'})
  bucketGroup.hover(
    function(){
      all.exclude(this);
      all.animate({opacity: '0.2'}, 180);      
      document.querySelector('.bucket').classList.add('bucket--active')
    },
    function(){
      all.push(this);
      all.animate({opacity: 1.0}, 180);
      document.querySelector('.bucket').classList.remove('bucket--active')
    });
}

new Vivus('diagram', {
  type: 'delayed', 
  start: 'autostart', 
  forceRender: false,
  duration: 200
}, LoadSnap);