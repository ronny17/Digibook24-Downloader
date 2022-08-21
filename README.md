# Digibook24-Downloader
Download your books from digibook24 as offline pdf\
Original repository https://github.com/Leone25/bSmart-downloader \
This is a version of bSmart-downloader adapted for digibook24 \
With this version you can download EdiErmes university books 

## How to use

### Installation
(NOTE: this assumes you already have [node.js](https://nodejs.org/))
1. Download and extract the repo
2. Open a terminal window in the folder where you extracted the repo
3. Run `npm i` to install all the required dependencies

### Usage

1. Open the dev tools (F12) and go to the storage(Firefox) or application(Chromium) tab, there click on `Cookie`, then `https://web.digibook24.it`, then copy in the file named `sessionID.txt` the cookie called `_bsmart_session_web`
2. Open a terminal window in the folder where you extracted the repo
3. Run `node index.js`
4. Input the id of the book you'd like to download, either from the list or from the url, after `/books/`. It's ususally a 4 digit number
5. Press enter and the script will start working, a file will be saved in the same folder as the one with the `index.js` with the name of the book, containing the full book downloaded.

Enjoy

**All rights reserved to Leone25. This is a modified copy of the original code published by Leone25**

Remember that you are responsible for what you are doing on the internet and even tho this script exists it might not be legal in your country to create personal backups of books.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT licence
