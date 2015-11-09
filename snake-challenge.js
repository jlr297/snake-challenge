function yourScript() {
  self.getDirectionForCollision = function(){
    switch(self.direction){
      case UP: self.snake_piece = [self.head_x, self.head_y - 1].join(); break;
      case DOWN: self.snake_piece = [self.head_x, self.head_y + 1].join(); break;
      case RIGHT: self.snake_piece = [self.head_x + 1, self.head_y].join(); break;
      default: self.snake_piece = [self.head_x - 1, self.head_y].join(); break;
    }
    
    var index = self.snake_sections.indexOf(self.snake_piece);
    if(index == -1 ){
      return '';
    }
    var snake_piece_x = self.snake_piece.split(',')[0];
    var snake_piece_y = self.snake_piece.split(',')[1];
    var next_piece = self.snake_sections[index+1];
    var next_piece_x = next_piece.split(',')[0];
    var next_piece_y = next_piece.split(',')[1];
    
    
    if(snake_piece_x > next_piece_x){
      return RIGHT;
    }
    else if(snake_piece_x < next_piece_x){
      return LEFT;
    }
    if(snake_piece_y > next_piece_y){
      return DOWN;
    }
    else if(snake_piece_y < next_piece_y){
      return UP;
    }
  };
  
  self.getDesiredDirections = function(){
    var dirs = [];
    if(self.head_x > self.food_x){
      dirs.push(LEFT);
    }
    else if(self.head_x < self.food_x){
      dirs.push(RIGHT);
    }
    if(self.head_y > self.food_y){
      dirs.push(UP);
    }
    else if(self.head_y < self.food_y){
      dirs.push(DOWN);
    }
    return dirs;
  };
  
  self.isSafe = function(option){
    return self.options.indexOf(option) >= 0;
  };
  
  self.stall = function(){
    if(self.head_y == 29 && self.head_x !== 0){
      return LEFT;
    }
    else{
      if(self.head_x % 2 === 0){
        if(self.isSafe(UP)){
          return UP;
        }
        else{
          return RIGHT;
        }
      }
      else{
        if(self.head_y < 28 && self.isSafe(DOWN)){
          return DOWN;
        }
        else if(self.isSafe(RIGHT)){
          return RIGHT;
        }
        else{
          return DOWN;
        }
      }
    }
  };
  
  self.aggresive = function(){
    if(self.peekForCollision(self.direction)){
      var result = self.getDirectionForCollision();
      if(result && self.isSafe(result)){
       return result; 
      }
    }
    
    for(var i=0; i < self.options.length; ++i){
      self.choice = self.options[i];
      if(self.desired_dirs.indexOf(self.choice) >= 0){
        return self.choice;
      }
    }
    return self.choice;
  };
  
  self.conservative = function(buffer){
    if(self.food_x - self.head_x > Math.floor(self.eaten/buffer) && self.isSafe(RIGHT) && 
      (self.isCellEmpty(0, 29) || self.food_x < self.snake_sections[0].split(',')[0])){
      return RIGHT;
    }
    else if(self.isFoodLeft() && self.isSafe(RIGHT) && self.isCellEmpty(0, 29)){
      return RIGHT;
    }
    else{
      return self.stall();
    }
  };
  
  self.semiConservative = function(){
    if(self.head_x === 0 || self.head_x === 39 || self.head_y === 0 || self.head_y === 29 || self.food_x === 39){
      return self.stall();
    }
    if(self.isCellEmpty(0, 29)){
      if(self.isFoodRight()){
        return RIGHT;
      }
      else if(!self.isFoodLeft()){
        if(self.isFoodAbove()){
          return UP;
        }
        else{
          return DOWN;
        }
      }
      else {
        return RIGHT;
      }
    }
    else{
      return self.stall();
    }
  };
  
  self.options = self.getOpenCellDirections();
  self.desired_dirs = self.getDesiredDirections();
  if(self.eaten < 40){
    return self.aggresive();
  }
  else if(self.eaten < 100){
    return self.conservative(40);
  }
  else if(self.eaten < 600){
    return self.conservative(100);    
  }
  else{
    return self.stall();
  }
}

