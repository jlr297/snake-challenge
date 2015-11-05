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
  
  self.options = self.getOpenCellDirections();
  self.desired_dirs = [];
  if(self.head_x > self.food_x){
    self.desired_dirs.push(LEFT);
  }
  else if(self.head_x < self.food_x){
    self.desired_dirs.push(RIGHT);
  }
  if(self.head_y > self.food_y){
    self.desired_dirs.push(UP);
  }
  else if(self.head_y < self.food_y){
    self.desired_dirs.push(DOWN);
  }
  if(self.peekForCollision(self.direction)){
    var result = self.getDirectionForCollision();
    if(result && self.options.indexOf(result) >= 0){
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
}

