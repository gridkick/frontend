# GridKick Frontend

## Setup
You'll need to have these installed: 
  
  * bundler
  * node
  * npm
  * node
  * bower (gobally installed)
  * bower-installer (globally installed)
  

### Javascript Libs
Javascript dependencies are managed using [Bower](http://bower.io/). The 
project root has a `.bowerrc` file that tells bower where to install the 
libraries (bower_components folder).

[Bower-Installer](https://github.com/blittle/bower-installer) is used to copy 
files from the bower_components folder into the appropriate folder(javascripts 
or stylesheets) so we don't need to check-in the whole javascript repo 
installed by bower. 

### Using Bower-Installer
* `$ cd vendor/assets/`
* `$ bower-installer`
* Running the above command will run `bower install` to install the libs 
defined in `bower.json`. It will then copy the main files to the appropriate 
folder which is version controlled and can be checked in. 

## Testing
Todo

## Deployment

#### Local
Make sure you're using the `deploy` vagrant VM setup for the `api`, `frontend`, `mongo`, and `redis`. Once that is setup and running, 

	cap local deploy:setup
	
	cap local deploy
	

#### Staging/Production
Shell commands,

	#### default is staging
	#
	cap staging deploy 
	
	cap production deploy