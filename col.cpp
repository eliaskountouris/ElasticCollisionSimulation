#include <iostream>
#include <vector>
#include <math.h>
#include <cmath>
using namespace std;

//helper function to print out vectors
void printVector(vector<double> data){
  for (int i =0; i<data.size();i++){
    cout << data[i];
    cout<< ' ';
  }
  cout << "\n";
}

//function that uses basic kinematics equations to update the velocity 
vector<double> updateVelocity(vector<double> v, vector<double>a, double t){
  vector<double> ret = {v[0]+(a[0]*t),v[1]+(a[1]*t)};
  return ret;
}

//checks the distance between 2 balls to see if they have collided yet
bool collide(vector<double>p1,vector<double>p2,double r1, double r2){
  //uses pythagorean therum to find distance
  double dx = p2[0]-p1[0];
  double dy = p2[1]-p1[1];
  double d = sqrt((dx*dx)+(dy*dy));
  
  //checks if distance is smaller than the radius
  if (d <= (r1+r2)){
    return true;
  }
  return false;
}

//function that uses newtons second law to find acceleration
vector<double> updateAccel(double m, vector<double>f){
  vector<double> ret = {f[0]/m,f[1]/m};
  return ret;
}

//function that uses kinematics equations to update the position
vector<double> updatePos(vector<double> p, vector<double>v, double t){
  vector<double> ret = {p[0]+(v[0]*t),p[1]+(v[1]*t)};
  return ret;
}

//function that finds spring force, given the overlap vector and the k value
vector<double> force(double k, vector<double>o){
  k*=-1;
  vector<double> ret = {o[0]*k,o[1]*k};
  return ret;
}

//main
int main() {
  //time increment set to small value for increased accuracy
  double dt = .000001;
  double temp;
  //first ball parameters
  vector<double> p1={0,0};
  vector<double> v1={0,0};
  vector<double> a1={0,0};
  double m1=0;
  double r1=0;
  cout<<"Input the initial x position of the first object"<< endl;
  cin>> p1[0];
  cout<<"Input the initial y position of the first object"<< endl;
  cin>> p1[1];
  cout<<"Input the initial x velocity of the first object"<< endl;
  cin>>v1[0];
  cout<<"Input the initial y velocity of the first object"<< endl;
  cin>>v1[1];
  cout<<"Input the mass of the first object"<< endl;
  cin>>m1;
  cout<<"Input the radius of the first object"<< endl;
  cin>> r1;

  //second ball parameters
  vector<double> p2={0,0};
  vector<double> v2={0,0};
  vector<double> a2={0,0};
  double m2=0;
  double r2=0;
  cout<<"Input the initial x position of the second object"<< endl;
  cin>>p2[0];
  cout<<"Input the initial y position of the second object"<< endl;
  cin>>p2[1];
  cout<<"Input the initial x velocity of the second object"<< endl;
  cin>>v2[0];
  cout<<"Input the initial y velocity of the second object"<< endl;
  cin>>v2[1];
  cout<<"Input the mass of the second object"<< endl;
  cin>>m2;
  cout<<"Input the radius of the second object"<< endl;
  cin>> r2;

  //spring constant
  double k = 1278;
  cout<<"Input the k value"<< endl;
  cin>> k;

  double t = 0;
  int pr = 0;
  //run loop
  int n = 1;
  temp = 0;
  bool collided = false;
  while ( true){

    //updates position
    p1 = updatePos(p1, v1, dt);
    p2 = updatePos(p2, v2, dt);
    
    //checks for collision
    if (collide(p1,p2,r1,r2)){
      collided = true;
      //finds overlap distance
      double dx = p2[0]-p1[0];
      double dy = p2[1]-p1[1];
      double d = sqrt((dx*dx)+(dy*dy));
      double om = r1+r2-d;

      //finds angle to get components
      //atan2 is built in function to find the right quadrant
      double thetaA = atan2(dy,dx);
      double thetaB = atan2(-dy,-dx);
      //overlap vector in cartesian form
      vector<double> oA = {om*cos(thetaA),om*sin(thetaA)};
      vector<double> oB = {om*cos(thetaB),om*sin(thetaB)};
      
      //finds force vector
      //force for both balls is the same, except they are in opposite directions
      vector<double> fA = force(k,oA);
      vector<double> fB = force(k,oB);

      //changes first balls acceleration
      a1 = updateAccel(m1, fA);
      //changes second balls acceleration
      a2 = updateAccel(m2, fB);

      //changes first balls velocity
      v1 = updateVelocity(v1, a1, dt);
      //changes second balls velocity
      v2 = updateVelocity(v2, a2, dt);
    }
    else{
      //if they aren't colliding change the acceleration to 0
      a1={0,0};
      a2={0,0};
    }

    //update time
    t+= dt;
    //print out variables
    pr+=1;
    if (pr/100000==n){
      n++;
      cout<<"t: ";
      cout<<t;
      cout<<"\n1: ";
      printVector(p1);
      cout<<"2: ";
      printVector(p2);
      //stop condition
      if (collided){
        temp++;
        if (temp==1){
          break;
        }
      }
    }
  }
}