if (document.images) {
    topMenu1on = new Image();   topMenu1on.src = "/images/2012_banner/in_my_area_ov.jpg"; 
    topMenu2on = new Image();   topMenu2on.src = "/images/2012_banner/alz_disease_ov.jpg"; 
    topMenu3on = new Image();   topMenu3on.src = "/images/2012_banner/living_with_alz_ov.jpg";  
    topMenu4on = new Image();   topMenu4on.src = "/images/2012_banner/professionals_ov.jpg";
    topMenu5on = new Image();   topMenu5on.src = "/images/2012_banner/we_can_help_ov.jpg";
    topMenu6on = new Image();   topMenu6on.src = "/images/2012_banner/join_the_cause_ov.jpg"; 
    topMenu7on = new Image();   topMenu7on.src = "";  
    topMenu8on = new Image();   topMenu8on.src = "/images/2012_banner/research_ov.jpg";
    
    //text + print controls
    img10on = new Image();   img10on.src = "/images/btn_size1_over.gif"; 
    img11on = new Image();   img11on.src = "/images/btn_size2_over.gif";  
    img12on = new Image();   img12on.src = "/images/btn_size3_over.gif";
    img13on = new Image();   img13on.src = "/images/btn_print_over.gif";
    img14on = new Image();   img14on.src = "/images/btn_email_over.gif"; 
    
    topMenu1off = new Image();  topMenu1off.src = "/images/2012_banner/in_my_area.jpg";
    topMenu2off = new Image();  topMenu2off.src = "/images/2012_banner/alz_disease.jpg"; 
    topMenu3off = new Image();  topMenu3off.src = "/images/2012_banner/living_with_alz.jpg";
    topMenu4off = new Image();  topMenu4off.src = "/images/2012_banner/professionals.jpg";
    topMenu5off = new Image();  topMenu5off.src = "/images/2012_banner/we_can_help.jpg";
    topMenu6off = new Image();  topMenu6off.src = "/images/2012_banner/join_the_cause.jpg"; 
    topMenu7off = new Image();  topMenu7off.src = "";
    topMenu8off = new Image();  topMenu8off.src = "/images/2012_banner/research.jpg";
    
    //text + print controls
    img10off = new Image();  img10off.src = "/images/btn_size1.gif"; 
    img11off = new Image();  img11off.src = "/images/btn_size2.gif";
    img12off = new Image();  img12off.src = "/images/btn_size3.gif";
    img13off = new Image();  img13off.src = "/images/btn_print.gif";
    img14off = new Image();  img14off.src = "/images/btn_email.gif"; 
    
    // text + print controls selected state
    img10sel = new Image();   img10sel.src = "/images/btn_size1_sel.gif"; 
    img11sel = new Image();   img11sel.src = "/images/btn_size2_sel.gif";  
    img12sel = new Image();   img12sel.src = "/images/btn_size3_sel.gif";
}
function imgOn(imgName) {
    if (document.images) {
        document[imgName].src = eval(imgName + "on.src");
    }
}
function imgOff(imgName) {
    if (document.images) {
        document[imgName].src = eval(imgName + "off.src");        
    }
}
function imgHighlight(imgName) {
    if (document.images) {
        document[imgName].src = eval(imgName + "sel.src");
    }
}
function highlight(imgName){
    //clear other imgs
    imgOff('img10');
    imgOff('img11');
    imgOff('img12');
    
    //highlight current img
    imgHighlight(imgName);
}