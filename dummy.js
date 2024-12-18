/* 


1: Add to cart items.
2:  Click on submit button 
3) Filter & collect the data and prepare it for sending to the api or server.
4: Wait for the resone to complete the request. client 
5: If the ddata is valid then the server will store the data somewhere in the databse or server.
6:if the data is invalid the server will send the respone that the data is not valid and try agin.


// get from the frontend.
vlaidteate and store if correct.
complete the order.
one order has been created


{
              Data.pages.optiontext.map((item) => {
                <option value={item.value} onChange={(e) => setSortType(e.target)} >
                  {item.lable}
                </option>
              })
            }



*/


 {
   /* Additional Navigation Links Section */
 }
 <div className="border-t border-gray-200 pt-4">
   <TypographyAtom
     additionalClasses="text-gray-600"
     text="Track Your Order"
     variant="body1"
   />
   <TypographyAtom
     additionalClasses="text-gray-600"
     text="Accounts"
     variant="body1"
   />
 </div>;