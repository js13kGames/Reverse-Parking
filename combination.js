/*
	---------------
     ▜▘▞▀▖▗▌ ▞▀▖▌ ▌
     ▐ ▚▄  ▌  ▄▘▙▞  CHALLENGE
    ▌▐ ▖ ▌ ▌ ▖ ▌▌▝▖
    ▝▘ ▝▀ ▝▀ ▝▀ ▘ ▘
	---------------

	Stupid Car Parking Idea

	░█▄█░█▀█░▀█▀░█▀█░░░█▀▄░█▀█░█▀▄░█░█
	░█░█░█▀█░░█░░█░█░░░█▀▄░█░█░█░█░░█░
	░▀░▀░▀░▀░▀▀▀░▀░▀░░░▀▀░░▀▀▀░▀▀░░░▀░


	TODO:
	- add fancy effects
*/

//all Events - object that holds the key pressed
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);


//-----GLOBALS-----//
var canvas, content, ctx, mobile, state, space = [],gOI, mainMenuLetters = [],score=0,
	timer = 0, max_timer = 70;
var car = {
	x: 0,
	y: 0,
	r: 0, //rotation
	dr: 0, //angular velocity
	s: 0, //speed/thurst
	w: 0  //wheels
};

/*
 * state:
 * -1 main menu
 * 0 main game
 * 1 game over
 * 2 game won
 */


var explosion_string = "data:audio/wav;base64,UklGRoYIAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YWIIAABGPBA+O1+00dD//92qtl2bsz5wOgAAEyg7iXZui4FytMjMzeDm2dbTsLB3bFAnJ2pul7+/0tXQYmIRAAAuhIT/396hoaGRVVVhUk5dY1hVZmZRR0lQUFhbWTAwP29zxbipeHdwgoKThYV0b29xhYeRbFFAKIOD7ryoiFRmZnWGnp6/rZORZXCHh6ancnFOOlVzeKurzdvq///YwKt1dW1ZWT89PS8kIAwMDDyLj//////LrZJRUVFRX3x8o6alpaWUSEgACFpavsa+vnl8oVe1g2x7XIKMTmSDa6q0UVFaRqzHwsza2dHQy0hIcoiWo6NDQD0wMGmJrHh4R4CA///+1L2viIiJm6iqurV7e4B+q9rYr6+TkJJnZxMAABMTRoeIyr+2sLO8fXhIm5/q/Pvthm41AAAAACIiSWVrenpGRgk+a4fTxsG6sKqopaF3XkkdNGhptLSloZiOi0xMGgoOSUl6h4dvaFhJSVuoqP7//+6Xly4oKChGSV5zhoehf2xZNlxjfZCOjoyMlZedor3O3fv15OTOzMCkVmEkNX90f4qKgW5wZl5XW19ifMLCrKmdn6WMmqea1N3Z1dq8epaZnPDx5OPa24JpdoCGh4IODiExS5CQgmxNTEyku9LLyq2pqp2Lfmdoaqy66LOhYm17oJqFb0g9Oy04OEE7NjIrRUZcbIGFobC+xtvbzo+PR0VGaH6UinlbLSkdPEpoaFlILCYjL4mJ+OPfzqh0ZyR2i8rrubmEg4mLk3RHNgAAAAAAAS0tXF+VqtP09fb2+Pjr19C2tp96bj4+R5CQ3OHhtpl5PzVwb4WdZF1/ep6PYUUefGzHrY1SSGlcnaajxNnAxqqdxMXS0pWVbGl7fKOo0+Cth1wpKyYmIyZVgpaoqK3D3OPjmnBMZ2+1zc6qdlojKSwvNkhPe3tQRxkKEyYpV1taQSwJChEWGTs9Tj45Qlp2enVfaWl5dXR3qazfqaludXZ8jpWkuMfQ4n16HidFVnmGi5actLbM0NHQ0dHY2uDisYlfMDSCgtLV1dfX2dm9d2MVFRmFhfCol1FMYHKDV1YnV3ijybOynqW9w93FdmoZHiEWFw4kMGRlWVMdS3uIrJJ4bmlVSWV4jp6tnI12OVZOqqSElXCGsLu7ydDIx3VvUk6NlJCOl52koZiepZWSnKnFu6RcXEZZc7GzvZZ2UlNcpajlv7R9XlBHcYe5zNLglpNzfot6Znd/s7W8xMe0rJqss8nGw6qnjW1pUFldZmdneJmqt3NeGy8wRX6TzcSFZys1OENIbXGViGBSKzhcaYyMg4N6e3+BhoiJmpusrK++wtHQz3RwFRUVRHmq3NzbqXpFGRkZG0VacHSkhKmXfoRyWmRZfo6qr7+Uen96cnRMSXR2jItdWG59pJ5vTEyDmNXUvauXWVQkIB1YYLmznIZCOiYuUl+Qk3l1aG6OlJynrcPFwbmdd2tQUVyQoL6vm5eYnWJZKUBIaIububy8u4F4RDw6MTU9REtCQTY8U1xwfZKitLzK1eHbuK6Pj6GpvcLCk45gYGBgYGBmZmtXVEFISVFVVlppiZy2srGsn4BuVVRTUVFsdJSXqq/ExqWPZ1hmjKC/v8LDx8fHkYhRUVFfYXWWp7WhpJx7fFljhJexvsezqKGfh3hKPV+CrbWdd2uAiJmSd2xmkJiegldPUllYVkhFNjIxN1lqe2NUU3yUm5JTSz9Hb3iInKOurqSXipqfuLu/hncvMzVVgaqojmNIQjEyMzdKVm5uZVtZa3KAaGBCR1xpeH+Fj5Kcn6ysvcHV1dLRzc3LyMbExJB9Ozc3doS/v7+xrp6enqe1w83MzKaMWU1NTV+CoLe3t7eso5OOrLPMwaaTgHVmVU1ohq+/qH5YPkJkcYqKlp2tr453aXqXlHRmWlBKQ0E3NUNJYWRpdnxvaUpBOVlkg2NWU22Jko6Ijo1sV2qAnJufoaCZiX12m6eslnKUqLOqk6SsqJd+bWplkKHBxMa4oIV0cGtsc3qEnKq6hHRLRUE4QGyEoZyZkpGcoKysqKajo7S5xsbAvri4t7a1s7GukYJZY2p8jJasmHtUSElJSUNBPFJqj5ittMTExMTEq5hybGpoZGR7h6ipjnBDOEF0j66uiXM6ODhTXXR0dH6BiIiIe3ZoaGhwgZGZmZmOhnVmW1xmgH5hWE5Wg5SqoYd1aFpVdYKNgmRgXHF8pKywnX12ipyPeH+Lf25ye3h0kZ+Jd05NW3WVn5+orKeIZmFkcHmEjZCOdF9PTUdsfaCNhHZpYl9wfIBnVUpibnyDhox7bVBScoSWm5+pqZ+al52kh3hbYmdvdHx5dm9ramZ2fouGhIByal1aWVZldZGRgHVtbm9xcGtoZnJ6jIyKiYeHk5mgoKWnqqmnpqSkn5qRkJCTlZaWmp+nqKiYhWZiY2yBl56eno+HfHx8dHh1jZGalpJ1bF9tdoF8c3d8lJeSjY2HfnB0hImVl5ONfnqJlIyAdXR8gHRrb3uMh35+fXZzeICMeWpweoh/d29sZmRkdHyMkIR7c3Z5eHVzcnqCdGt0gZSLgYKDg4B6gYWIh4V+enRzc3R4fIGGj4R6aHaDmZGKfHl1b3B6goaJi46Jf3Jvbmxra3h/hYR8d3R0dXV1dYKKkpKLgnNycnR2eIOJkY2Lh4J/en+EjIl/dXN+hYyMjY+Pj4+OjoaBfn+DhoeHiImJiIB5dnd5fX+DgH13eXuEhoZ+eXV5fYODfnx9fnx7f4OCfXt7foKFhoSBfXp4eXuAg4B8eXh5en18e31/gYGBf358fHt8fn9/f36AgYKBgIGAf35/gIGBgoKCgYCAgYGBgX9/f4CAgICAf39/f3+AgICA";
var explosion_sound = new Audio(explosion_string);

//-----GLOBALS END-----//






/*
cu: car up
cl : car left
cr: car right
cd: car down
o: cone
w: wall
*/

var initial_settings = [];
var counter;
var pIndex;
var game_size = 610;
var wall_dimension = 30;
var wall_size = game_size/wall_dimension;
var car_small = 20;
var car_big = 2*car_small;
var diagonal = Math.sqrt(car_big*car_big + car_small*car_small);
var cone_size = 14;
var distance_constant = 15; // Distance between cars
var distance_constant2 = 30; // Minimal distance between walls/parkings
var beg_constant = wall_size+distance_constant2+1;
var end_constant = game_size-distance_constant2-1-wall_size;
var maxDistance = 3;

function randomInt(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function FillSpace(space, initial_settings)
{
	counter = 1000;
	InitializeSpace(space, initial_settings);
	FillParkings(space);
	PlaceCones(space);
}

function CheckVictory(space, x, y, r, s)
{
	var xA, yA, xC, yC,xO, yO, xCenterCar, yCenterCar, xCenterP, yCenterP;



	xO = x + car_small/2;
	yO = y;

	// Applying some transformation by angle (alfa) Mathematically.
	xA = xO - car_small/2 * Math.cos(r);
	yA = yO + Math.sin(r)*car_small/2;

	xC = xO + car_small/2 * Math.cos(r) - car_big*Math.sin(r);
	yC = yO - car_small/2 * Math.sin(r) + car_big * Math.cos(r);


	xCenterCar = (xA+xC)/2;
	yCenterCar = (yA+yC)/2;

	if(space[pIndex][0] == "ph")
	{
		xCenterP = space[pIndex][1] + car_big/2;
		yCenterP = space[pIndex][2] + car_small/2;
	}
	else
	{
		xCenterP = space[pIndex][1] + car_small/2;
		yCenterP = space[pIndex][2] + car_big/2;
	}

	
	return(Math.abs(xCenterP-xCenterCar) <= maxDistance && Math.abs(yCenterP-yCenterCar) <= maxDistance && s==0);
}


// This function sets walls on the borders
function InitializeSpace(space, initial_settings)
{
	var r, r2;
	r = randomInt(1, 4);
	r2 = randomInt(4, wall_dimension-5);
	
	initial_settings.push(r);
	initial_settings.push(r2);


	for(var i=0; i<wall_dimension; i++)
	{
		if(i>=r2 && i<r2+3)
		{
			switch(r)
			{
				case 1:
						space.push(["w", i*wall_size, game_size-wall_size]);
						space.push(["w", 0, i*wall_size]);
						space.push(["w", game_size-wall_size, i*wall_size]);
						break;
				case 2:
						space.push(["w",i*wall_size,0]);
						space.push(["w", 0, i*wall_size]);
						space.push(["w", game_size-wall_size, i*wall_size]);
						break;
				case 3:
						space.push(["w",i*wall_size,0]);
						space.push(["w", i*wall_size, game_size-wall_size]);
						space.push(["w", game_size-wall_size, i*wall_size]);
						break;
				case 4:
						space.push(["w",i*wall_size,0]);
						space.push(["w", i*wall_size, game_size-wall_size]);
						space.push(["w", 0, i*wall_size]);
						break;
			}
		}
		
		else
		{
			space.push(["w",i*wall_size,0]);
			space.push(["w", i*wall_size, game_size-wall_size]);
			space.push(["w", 0, i*wall_size]);
			space.push(["w", game_size-wall_size, i*wall_size]);
		}
	}
	
}

function CheckIntersection(x1_b, y1_b, x1_e, y1_e, x2_b, y2_b, x2_e, y2_e)
{
	
	return !(x1_b > x2_e || x1_e < x2_b || y1_b > y2_e || y1_e < y2_b);
}

//This function checks if an area is free from objects
function CheckLocation(space, x_b, y_b, x_e, y_e)
{
	for(var i = 0; i<space.length; i++)
	{
		switch(space[i][0])
		{
			case "cr":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+car_big, space[i][2]+car_small))
					return false;
				break;
			case "cl":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+car_big, space[i][2]+car_small))
					return false;
				break;
			case "cu":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+car_small, space[i][2]+car_big))
					return false;
				break;
			case "cd":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+car_small, space[i][2]+car_big))
					return false;
				break;
			case "o":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+cone_size, space[i][2]+cone_size))
					return false;
				break;
			case "w":
				if(CheckIntersection(x_b, y_b, x_e, y_e, space[i][1], space[i][2], space[i][1]+wall_size, space[i][2]+wall_size))
				{
					return false;
				}
				break;
		}
	}
	return true;
}



function FillParkings(space)
{
	var numberP = randomInt(1, 3);
	var pNumber;
	var pPlace = 0;
	for(var i=0; i<numberP; i++)
	{
		var xBeg = 0,yBeg = 0, xEnd = 0, yEnd = 0;
		var nCars = randomInt(2, 5); // Number of cars aligned		
		var type = randomInt(1,2); // Double parking or no
		var orientation = randomInt(0, 1); // 1 is when the car is vertical. 0 when horizontal	
		var toUse;
		if(orientation == 1)
		{
			while(!CheckLocation(space, xBeg-distance_constant2-car_big, yBeg-distance_constant2-car_big, xEnd+distance_constant2+car_big, yEnd+distance_constant2+car_big))
			{
				counter--;
				if(counter == 0)
				{
					initialize();
				    return;
				}
				xBeg = randomInt(beg_constant, end_constant);
				yBeg = randomInt(beg_constant, end_constant);
				xEnd = xBeg + car_small*nCars + distance_constant*(nCars-1);
				yEnd = yBeg + car_big*type + distance_constant*(type-1);
			}
			var temp = xBeg;

			// Here we set the position of the parking spot
			if(i == 0)
			{
				pNumber = randomInt(0, nCars-1);
				//alert(pNumber);
				if(type==2)
				{
					pPlace = randomInt(0, 1);
				}
			}

			for(j = 0; j<type; j++)
			{
				for(var k=0; k<nCars; k++)
				{
					// This is the parking spot
					if(k == pNumber && j == pPlace && i == 0)
					{
						space.push(["pv", xBeg, yBeg]);
					}

	
					else
					{
						toUse = (j==0)? "cd" : "cu";
						space.push([toUse, xBeg, yBeg]);
					}
					xBeg += car_small + distance_constant;
				}
				xBeg = temp;
				yBeg += car_big + distance_constant;
			}
		}
		else
		{
			while(!CheckLocation(space, xBeg-distance_constant2-car_big, yBeg-distance_constant2-car_big, xEnd+distance_constant2+car_big, yEnd+distance_constant2+car_big))
			{
				counter--;
				if(counter == 0)
				{
					initialize();
					return;
				}
				xBeg = randomInt(beg_constant, end_constant);
				yBeg = randomInt(beg_constant, end_constant);
				xEnd = xBeg + car_big*type + distance_constant*(type-1);
				yEnd = yBeg + car_small*nCars + distance_constant*(nCars-1);
			}

			if(i == 0)
			{
				pNumber = randomInt(0, nCars-1);
				//alert(pNumber);
				if(type==2)
				{
					pPlace = randomInt(0, 1);
				}
			}

			var temp = yBeg;
			for(j = 0; j<type; j++)
			{
				for(var k=0; k<nCars; k++)
				{
					if(k == pNumber && j == pPlace && i == 0)
					{
						space.push(["ph", xBeg, yBeg]);
					}
					else
					{
						toUse = (j==0)? "cr" : "cl";
						space.push([toUse, xBeg, yBeg]);
					}
					yBeg += car_small + distance_constant;
				}
				yBeg = temp;
				xBeg += car_big + distance_constant;
			}
		}
	}

	for(var k =0; k<space.length; k++)
	{
		if(space[k][0] == "ph" || space[k][0] == "pv")
		{
			pIndex = k;
		}
	}
}


function PlaceCones(space)
{
	var xBeg=0, yBeg=0, xEnd=0, yEnd=0;
	var number = randomInt(10, 20);
	for(var i=0; i<number; i++)
	{
		while(!CheckLocation(space, xBeg-distance_constant2-car_big, yBeg-distance_constant2-car_big, xEnd+distance_constant2+car_big, yEnd+distance_constant2+car_big))
		{
			counter--;
			if(counter == 0)
			{
				initialize();
				return;
			}
			xBeg = randomInt(beg_constant, end_constant);
			yBeg = randomInt(beg_constant, end_constant);
			xEnd = xBeg + cone_size;
			yEnd = yBeg + cone_size;
		}
		space.push(["o", xBeg, yBeg]);
	}
}

function CheckCollision(x, y, xBeg, yBeg, xEnd, yEnd)
{
	return (x>=xBeg && x<=xEnd && y>=yBeg && y<=yEnd);
}

function CheckCollisionInSpace(space, x, y)
{
	for(var k=0; k<space.length; k++)
	{
		switch(space[k][0])
		{
			case "w":
				if (CheckCollision(x,y, space[k][1], space[k][2], space[k][1]+wall_size, space[k][2]+wall_size))
					return true;
				break;
			case "o":
				if (CheckCollision(x, y, space[k][1], space[k][2], space[k][1]+cone_size, space[k][2]+cone_size))
					return true;
				break;
			case "cu":
				if (CheckCollision(x, y, space[k][1], space[k][2], space[k][1]+car_small, space[k][2]+car_big))
					return true;
				break;
			case "cd":
				if (CheckCollision(x, y, space[k][1], space[k][2], space[k][1]+car_small, space[k][2]+car_big))
					return true;
				break;
			case "cr":
				if (CheckCollision(x, y, space[k][1], space[k][2], space[k][1]+car_big, space[k][2]+car_small))
					return true;
				break;
			case "cl":
				if (CheckCollision(x, y, space[k][1], space[k][2], space[k][1]+car_big, space[k][2]+car_small))
					return true;
				break;
		}
	}
	return false;
}

function CheckCarCollision(space, xCar, yCar, r)
{
	/* A: top left
	   B: top right
	   C: bottom left
       D: bottom right
	   O: middle of AB
	   F: middle of BC
	   G: middle of AD
	   H: middle of CD
	   I: Middle of AG
	   J: Middle of DG
	   K: Middle of BF
	   L: Middle of FC
    */
	var xA, yA, xB, yB, xC, yC, xD, yD, xF, yF, xG, yG, xH, yH, xO, yO, xI, yI, xJ, yJ, xK, yK, xL, yL;
	
	xO = xCar + car_small/2;
	yO = yCar;

	// Applying some transformation by angle (alfa) Mathematically.
	xA = Math.floor(xO - car_small/2 * Math.cos(r));
	yA = Math.floor(yO + Math.sin(r)*car_small/2);

	xB = Math.floor(xO + car_small/2 * Math.cos(r));
	yB = Math.floor(yO - Math.sin(r)*car_small/2);
	
	xD = Math.floor(xO - car_small/2 * Math.cos(r) - car_big * Math.sin(r));
	yD = Math.floor(yO + car_small/2 * Math.sin(r) + car_big * Math.cos(r));

	xC = Math.floor(xO + car_small/2 * Math.cos(r) - car_big*Math.sin(r));
	yC = Math.floor(yO - car_small/2 * Math.sin(r) + car_big * Math.cos(r));

	xF = (xB+xC)/2;
	yF = (yB+yC)/2;
	
	xG = (xA+xD)/2;
	yG = (yA+yD)/2;

	xH = (xC+xD)/2;
	yH = (yC+yD)/2;
	
	xI = (xA+xG)/2;
	yI = (yA+yG)/2;

	xJ = (xD+xG)/2;
	yJ = (yD+yG)/2;

	xK = (xB+xF)/2;
	yK = (yB+yF)/2;

	xL = (xC+xF)/2;
	yL = (yC+yF)/2;

	

	return (CheckCollisionInSpace(space, xO, yO) || CheckCollisionInSpace(space, xA, yA) || CheckCollisionInSpace(space, xB, yB) || CheckCollisionInSpace(space, xD, yD) || CheckCollisionInSpace(space, xC, yC) || CheckCollisionInSpace(space, xF, yF) || CheckCollisionInSpace(space, xG, yG) || CheckCollisionInSpace(space, xH, yH) || CheckCollisionInSpace(space, xI, yI) || CheckCollisionInSpace(space, xJ, yJ) || CheckCollisionInSpace(space, xK, yK) || CheckCollisionInSpace(space, xL, yL));
		
}






var initialize = function() {
	var element = document.getElementById('game');
	canvas = element.firstElementChild;
	// Setting up the canvas
	ctx = canvas.getContext('2d');
	state = 0;

	space = [];
	initial_settings = [];
	FillSpace(space, initial_settings);

	car.dr = 0;
	car.s = 0;
	car.w = 0;
	gOI = 0;
	fillMainMenu();

	switch(initial_settings[0])
	{
		case 1:
			car.x = Math.floor((initial_settings[1]+1.5)*wall_size);
			car.y = 0;
			car.r = 0;
			break;
		case 2:
			car.x = Math.floor((initial_settings[1]+1.5)*wall_size);
			car.y = game_size;
			car.r = Math.PI;
			break;
		case 3:
			car.x = -car_small/2
			car.y = Math.floor((initial_settings[1]+1.5)*wall_size)+car_small/2;
			car.r = -Math.PI/2;
			break;
		case 4:
			car.x = game_size-car_small/2;
			car.y = Math.floor((initial_settings[1]+1.5)*wall_size)+car_small/2;
			car.r = Math.PI/2;
			break;
	}
}


//the game loop that runs 60/s
var run = function () {
	initialize();
	state = -1;
	window.requestAnimationFrame(loop);
}

var update = function(animStart) {
	//update position and rotation of the car
	//check colision
	if (state == 0){
		timer++;
		if (CheckCarCollision(space, car.x, car.y, car.r))
		{
			explosion_sound.play();
			state = 1;
		}

		if (Math.floor(timer/60) >= max_timer) {
			state = 1;
		}
		
		if (CheckVictory(space, car.x, car.y, car.r, car.s))
		{
			timer = 0;
			(max_timer>15)? max_timer -= 10:0;
			state = 2;
			score++;
		}

		if (keysDown[37]) { //left
			(car.w < -0.0133771)?car.w=-0.0133771:car.w -= 0.00016;
		}
		if (keysDown[39]) { //right
			(car.w > 0.0133771)? car.w=0.0133771:car.w += 0.00016;
		}
		if (keysDown[38]) { //up
			car.s += 0.01;
			(car.s > 2.8)? car.s = 2.8:0;
			car.r += car.w/2;
		}
		else {
			car.s -=  0.001*(Math.abs(car.w*1500));
			(car.s < 0) ? car.s = 0 :car.s;
		}
		if (keysDown[40]) { //down
			car.s -= 0.015;
			(car.s < 0) ? car.s = 0:0;
		}
		if (!keysDown[40] && !keysDown[38]) //when there's no gas pressing
		{
			car.s= (car.s<0.005) ? 0 : car.s-0.0075*Math.sqrt(car.s)
		}
		(car.s>0)?car.r += car.w/2:0;
		car.x -=  car.s * Math.sin(car.r);
		car.y +=  car.s * Math.cos(car.r);
	}
	else if(state == 1)
	{
		(gOI < 60)? gOI+=10: 0;
		if(keysDown[32])
		{
			max_timer = 70;
			timer = 0;
			score = 0;
			initialize();
		}
	}
	else if (state == -1) {
		//here update the main title
		//update every letter following a sinusoidal function
		for (var i=0; i< mainMenuLetters.length; i+= 4) {
			(mainMenuLetters[i+3]) ?mainMenuLetters[i+2] += 0.1:mainMenuLetters[i+2] -= 0.1;
			if (mainMenuLetters[i+2] > 1) { //going up and reached limit
				mainMenuLetters[i+3] = false;
				mainMenuLetters[i+2] -= 0.1;
			}
			else if (mainMenuLetters[i+2] < -1) {
				mainMenuLetters[i+3] = true;
				mainMenuLetters[i+2] += 0.1;
			}
		}
		if(keysDown[32])
		{
			state = 0;
		}
	}
	else if (state == 2) {
		(gOI < 120)? gOI+=10: 0;
		if(keysDown[32]) {
			gOI = 0;
			initialize();
		}
	}
}

function drawCone(x,y,ratio) {
	/* full blown color */
	var w = 12;
	ctx.fillStyle = "#FF6600";
	ctx.fillRect(x,y,w+2,w+2);
	ctx.fillStyle = "#F6B482";
	ctx.fillRect(x,y,w,w);
	ctx.beginPath();
	ctx.arc(x+w/2, y+w/2, w/2, 0, 2*Math.PI,false);
	var g = ctx.createRadialGradient(x+w/2, y+w/2, 5, x+w/2, y+w/2, w/2+1);
	g.addColorStop(0, '#FF6600');
	g.addColorStop(1, '#F6B482');
	ctx.fillStyle = g;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+w/2, y+w/2, 3, 0, 2*Math.PI,false);
	ctx.fillStyle = '#E54239';
	ctx.fill();
}


function drawCar(x,y,r,W,t) {
	var w = 20;
	ctx.translate(x+w/2,y);
	ctx.rotate(r);
	

	ctx.translate(-w/2,0);

	//wheels
	ctx.fillStyle = '#000000';
	ctx.translate(0, w/2);
	ctx.rotate(-W*30);
	ctx.translate(-3, -w/(1.5*2));
	ctx.fillRect(0,0,w/3,w/1.5);
	ctx.translate(3, w/(1.5*2));
	ctx.rotate(W*30);
	ctx.translate(0, -w/2);
	
	ctx.translate(w,w/2);
	ctx.rotate(-W*30);
	ctx.translate(-4, -w/(1.5*2));
	ctx.fillRect(0,0,w/3,w/1.5);
	ctx.translate(4, w/(1.5*2));
	ctx.rotate(W*30);
	ctx.translate(-w, -w/2);

	ctx.fillRect(-2,w*1.3,w/3,w/1.8);
	ctx.fillRect(w-(w/3)+2,w*1.3,w/3,w/1.8);
	//end wheels

	var g=ctx.createLinearGradient(0,0,0,w);
	/*ctx.shadowBlur = 2;
	ctx.shadowColor = "#606060";*/
	g.addColorStop(0, t?'#FAD8B0':'#B0F8AF');
	g.addColorStop(1, t?'#BF3819':'#1938BF');
	ctx.fillStyle = g;
	ctx.fillRect(0,0,w,2*w);
	ctx.fillStyle = '#1F3351';

	ctx.beginPath();
	ctx.moveTo(w/5,(2*w)/3+1);
	ctx.quadraticCurveTo(w/2,(2*w)/3-w/6,w-w/5,(2*w)/3+1);
	ctx.lineTo(w-w/4,(3*w)/3+3);
	ctx.quadraticCurveTo(w/2,(3*w)/3-5,w/4,(3*w)/3+3);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(w/7,(2*w)/2.5+1);
	ctx.lineTo(w/7,w*1.7);
	ctx.quadraticCurveTo(w/3.5, 1.6*w, w/7,(2*w)/2.5+1);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(w-w/7,(2*w)/2.5+1);
	ctx.lineTo(w-w/7,w*1.7);
	ctx.quadraticCurveTo(w-w/3.5, 1.6*w, w-w/7,(2*w)/2.5+1);
	ctx.fill();
	ctx.fillRect(w/5.5,w*1.8,w-2*(w/5.5),w/7);
	//ctx.shadowBlur = 0;

	ctx.translate(w/2,0);

	ctx.rotate(-r);
	ctx.translate(-x-w/2,-y);
}


function drawGameOver() {
	ctx.font = "50px monospace";
	ctx.fillStyle = '#191919';
	ctx.fillText("Game Over", 163, 303-60+gOI);
	ctx.fillStyle = '#19A0BF';
	ctx.fillText("Game Over", 160, 300-60+gOI);
	ctx.fillRect(160,310-60+gOI,270,5);
	ctx.font = "18px monospace";
	ctx.fillStyle = '#000000';
	ctx.fillText("Press         To Restart", 165, 340-60+gOI);
	ctx.fillStyle = '#19A0BF';
	ctx.fillText("<SPACE>", 230, 340-60+gOI);
}


function drawParkingSpot(x,y,t) {
	ctx.strokeStyle = "#F8F596";
	ctx.fillStyle = ctx.strokeStyle;
	var w = car_small,h = car_big;
	t? ctx.strokeRect(x,y,w, h):ctx.strokeRect(x,y,h, w);
	ctx.font = "12px monospace";
	t? ctx.fillText("P", x+w/2-4, y+h/2+3):ctx.fillText("P", x+h/2-3, y+w/2+3);
}


function fillMainMenu() {
	var title = "Reverse Parking";
	var ite = 0;
	for (var i in title) {
		mainMenuLetters.push(title[i]);
		mainMenuLetters.push(i*30+75);
		mainMenuLetters.push(Math.random()*2-1);
		mainMenuLetters.push((Math.random()>0.5));
	}
}


function getMenuPos(x) {
	return 5*Math.asin(x);
}


function drawMainMenu() {
	ctx.font = "50px monospace";
	for (var i=0; i< mainMenuLetters.length; i+=4) {
		ctx.fillStyle = '#191919';
		ctx.fillText(mainMenuLetters[i], mainMenuLetters[i+1],
			getMenuPos(mainMenuLetters[i+2])+300
		);
		ctx.fillStyle = '#19A0BF';
		ctx.fillText(mainMenuLetters[i], mainMenuLetters[i+1]+5,
			getMenuPos(mainMenuLetters[i+2])+300
		);
	}
	ctx.fillRect(160,250,270,5);
	ctx.fillRect(160,320,270,5);
	ctx.font = "18px monospace";
	ctx.fillStyle = '#000000';
	ctx.fillText("Press        To Start", 180, 350);
	ctx.fillStyle = '#19A0BF';
	ctx.fillText("<SPACE>", 240, 350);
}


function drawGameWon() {
	ctx.font = "50px monospace";
	ctx.fillStyle = '#191919';
	ctx.fillText("You Parked!", 30+gOI+4,310+4);
	ctx.fillStyle = '#19A0BF';
	ctx.fillText("You Parked!", 30+gOI, 310);
	if (gOI >= 110) {
		ctx.fillStyle = '#191919';
		ctx.font = "18px monospace";
		ctx.fillText("Press         To Continue", 170, 350);
		ctx.fillStyle = '#19A0BF';
		ctx.fillText("<SPACE>", 240, 350);
		ctx.fillRect(160,250,270,5);
		ctx.fillRect(160,320,270,5);
	}
}


function drawScore() {
	ctx.font = "18px monospace";
	ctx.fillStyle = '#191919';
	var text = "You parked   time";
	(score>1)? text+='s':0;
	ctx.fillText(text, 10,15);
	ctx.fillStyle = '#19A0BF';
	ctx.fillText(score, 130, 15);

	ctx.fillStyle = '#191919';
	ctx.fillText(Math.floor(max_timer - timer/60)+"s left", 330, 15);
}

var draw = function() {
	ctx.fillStyle = '#3A393E';
	ctx.clearRect(0,0,610,610);
	ctx.fillRect(0,0,610,610);
	
	for(var k = 0; k<space.length; k++)
	{
		switch(space[k][0])
		{
			case "w":
				ctx.fillStyle = '#E6E3C6';
				ctx.fillRect(space[k][1], space[k][2], wall_size, wall_size);
				break;
			case "cu":
				drawCar(space[k][1], space[k][2], 0, 0, 0);
				break;
			case "cd":
				drawCar(space[k][1], space[k][2]+car_big, Math.PI, 0, 0);
				break;
			case "cr":
				drawCar(car_big-car_small/2+space[k][1], car_small/2+space[k][2], Math.PI/2, 0, 0);
				break;
			case "cl":
				drawCar(-car_small/2+space[k][1], car_small/2+space[k][2], -Math.PI/2, 0, 0);
				break;
			case "o":
				drawCone(space[k][1], space[k][2]);
				break;
			case "pv":
				drawParkingSpot(space[k][1],space[k][2],true);
				break;
			case "ph":
				drawParkingSpot(space[k][1],space[k][2],false);
				break;
		}	
	}
	// to the right drawCar(car_big-car_small/2, car_small/2, Math.PI/2, 0, 0);
	// to the left drawCar(-car_small/2, +car_small/2, -Math.PI/2, 0, 0);	
	// down drawCar(0, car_big, Math.PI, 0, 0);	
	drawCar(car.x,car.y,car.r,car.w,1);
	if (state == 1) { //gameover
		drawGameOver();
	}
	else if (state == -1) { //
		drawMainMenu();
	}
	else if (state == 2) {
		drawGameWon();
	}
	if (state != -1) {
		drawScore();
	}
}

var loop = function(animStart) {
	update(animStart);
	draw();
	requestAnimationFrame(loop);
}

run();
