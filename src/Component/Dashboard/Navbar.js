// src/components/NavBar.js
import { Box, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar({ anchorEl, subItems, handleTabHover, handleSubClick, handleClose }) {
  const categories = [
    { label: "العناية الشخصية", sub: [{ label: "العطور", value: "fragrances" }, { label: "العناية بالبشرة", value: "skin-care" },{ label: "ادوات تجميل", value: "beauty" }] },
    { label: "منزلية", sub: [{ label: "اكسسوارات المطبخ", value: "kitchen-accessories" },{ label: "البقالة", value: "groceries" }, { label: "ديكورات المنزل", value: "home-decoration" }, { label: "الأثاث", value: "furniture" }] },
    { label: "الموضة", sub: [{ label: "القمصان", value: "tops" }, { label: "فساتين نسائية", value: "womens-dresses" }, { label: "أحذية نسائية", value: "womens-shoes" }, { label: "أحذية رجالية", value: "mens-shoes" }, { label: "قمصان رجالية", value: "mens-shirts" }, { label: "حقائب نسائية", value: "womens-bags" }, { label: "ساعات رجالية", value: "mens-watches" }, { label: "ساعات نسائية", value: "womens-watches" }, { label: "مجوهرات نسائية", value: "womens-jewellery" }, { label: "نظارات شمسية", value: "sunglasses" }] },
    { label: "مركبات", sub: [{ label: "سيارات", value: "vehicle" }, { label: "دراجات نارية", value: "motorcycle" }] },
    { label: "إلكترونيات", sub: [ { label: "الهواتف الذكية", value: "smartphones" }, { label: "اجهزة كمبيوتر", value: "laptops" }, { label: "ملحقات الهاتف المحمول", value: "mobile-accessories" }] },
    { label: "رياضة", sub: [ { label: "اكسسوارات رياضية", value: "sports-accessories" }] },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const activeTabValue = categories.find((cat) => cat.sub.some((s) => s.value === type))?.label;

  return (
    <>
      <div className="w-100 d-flex justify-content-center align-content-center border"style={{background:'#e5e9ed'}}>
        <Box
          sx={{
            width: '100%',
            whiteSpace: 'nowrap',
            // bgcolor: 'background.paper',
            fontSize: '20px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '3px',
          }}
        >
          <Tabs
            value={activeTabValue || false}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="category tabs"
            sx={{
              '& .MuiTabs-scroller': {
                flexDirection: 'row-reverse',
                direction: 'ltr',
              },
            }}
          >
            {categories.map((cat, index) => (
              <Tab
                key={index}
                label={cat.label}
                value={cat.label}
                onClick={(e) => handleTabHover(e, cat.sub)}
                sx={{
                  fontWeight: 'bold',
                  padding: '0',
                  margin: '8px 5px 3px 5px',
                  maxHeight: '35px',
                  minHeight: '30px',
                  fontSize: "19px",
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    backgroundColor: "#06637d",
                    color: "white",
                    borderRadius: "7px",
                  },
                  "&:hover": {
                    color: "white",
                    borderRadius: "7px",
                    backgroundColor: "#167995",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#9bd2ed",
                    color: "black",
                  },
                }}
              />
            ))}

            <Tab
              value="/"
              label="الصفحة الرئيسية"
              onClick={() => navigate('/')}
              sx={{
                margin: '8px 5px 3px 5px',
                maxHeight: '35px',
                minHeight: '30px',
                fontSize: "unset",
                transition: "all 0.3s ease",
                borderRadius: "7px",
                backgroundColor: location.pathname === '/' ? '#06637d' : "",
                color: location.pathname === '/' ? 'white' : "",
                "&.Mui-selected": {
                  color: "white",
                  borderRadius: "7px",
                },
                "&:hover": {
                  color: "white",
                  borderRadius: "7px",
                  backgroundColor: "#167995",
                },
              }}
            />
          </Tabs>
        </Box>
      </div>

      {/* قائمة الفروع */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        disableScrollLock={true}
      >
        {subItems.map((sub) => (
          <MenuItem key={sub.value} onClick={() => handleSubClick(sub.value)}>
            {sub.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
