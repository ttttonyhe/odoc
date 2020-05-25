#include <stdio.h>

int main(){
	int array[] = {2,1,6,4,7,9,4,6,8,0,6,7,8,2,3,5,6,7,8,5,3,6,8,3,2,5};
	int length = sizeof(array) / sizeof(int);	
	
	for(int i = 0; i<length - 1;i++){
		for(int j = 0; j<length - i - 1;j++){
			if(array[j + 1] < array[j]){
				int temp = array[j + 1];
				array[j + 1] = array[j];
				array[j] = temp;
			}
		}
	}

	for(int k = 0;k<length;k++){
		printf(" %d",array[k]);
	}

	return 0;
}
