# 🖼️ CapyCares Logo & Image Upload Guide

**ALL EXISTING LOGOS HAVE BEEN REMOVED** - The website now shows clean placeholders ready for your custom images!

## 📁 STEP 1: Create Images Folder

**IMPORTANT**: You MUST create an `images` folder in your project directory:

```
Webdevvvv/
├── images/                    ← CREATE THIS FOLDER FIRST!
│   ├── (your logo files go here)
├── index.html
├── style.css
└── ... other files
```

## 🎯 STEP 2: Upload Your Logos

### **Main Logo (Header on all pages)**
**📍 Upload location**: `images/capybara-logo.png`
**📏 Recommended size**: 50x50 pixels
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) line 21
**💡 Usage**: Shows in header on every page

### **Hero Icon (Home page center)**
**📍 Upload location**: `images/hero-capybara.png`
**📏 Recommended size**: 80x80 pixels
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) line 22
**💡 Usage**: Large icon next to "AI Powered Peer Support Platform" text

### **Main Illustration (Home page)**
**📍 Upload location**: `images/capy-with-phone.png`
**📏 Recommended size**: 300x200 pixels
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) line 23
**💡 Usage**: Main illustration on home page and signup pages

### **Login Pages Illustration**
**📍 Upload location**: `images/capy-at-desk.png`
**📏 Recommended size**: 200x150 pixels
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) line 24
**💡 Usage**: Shows on student-login.html and admin-login.html

### **Terms & Conditions Illustration**
**📍 Upload location**: `images/capy-with-magnifying-glass.png`
**📏 Recommended size**: 150x150 pixels
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) line 25
**💡 Usage**: Shows on terms-conditions.html page

### **Admin Illustrations**
**📍 Upload locations**: 
- `images/admin-capy-headset.png` (Admin login)
- `images/angry-capy.png` (Admin signup)
**📏 Recommended size**: 200x150 pixels each
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) lines 26-27

## 🎨 STEP 3: Interest Category Images (Optional)

**📍 Upload locations** (all in `images/` folder):
- `capy-dancing.png` - Dance Lab category
- `capy-coding.png` - Coding Den category  
- `capy-hackathon.png` - Hackathon Hub category
- `capy-creative.png` - Creative Corner category
- `capy-gaming.png` - Gaming Guild category
- `capy-reading.png` - Book Club category
- `capy-music.png` - Music Makers category
- `capy-fitness.png` - Fitness Friends category
- `capy-cooking.png` - Cooking Club category

**📏 Recommended size**: 120x80 pixels each
**🔧 Code location**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css) lines 490-530

## ⚡ STEP 4: How to Upload

### **Method 1: Simple File Copy**
1. Create the `images` folder in your project directory
2. Copy your image files into the `images` folder
3. Rename them to match the exact names listed above
4. Refresh your browser - images will appear automatically!

### **Method 2: Use Different Filenames**
If you want to use different filenames:
1. Open [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css)
2. Find lines 21-27 (the CSS variables section)
3. Change the filenames:

```css
/* CHANGE THESE PATHS TO YOUR FILENAMES */
--logo-image: url('images/my-logo.png');        ← Change this
--hero-capy-image: url('images/my-hero.png');   ← Change this
/* etc... */
```

## 📍 Exact Code Locations

### **CSS Variables to Edit** (Primary method)
**File**: [`style.css`](file://c:\\Users\\lakshman%20pillai\\Desktop\\Webdevvvv\\style.css)
**Lines**: 21-27
```css
/* Image paths - UPDATE THESE TO CHANGE IMAGES */
--logo-image: url('images/capybara-logo.png');                    ← MAIN LOGO
--hero-capy-image: url('images/hero-capybara.png');               ← HERO ICON
--illustration-capy-image: url('images/capy-with-phone.png');     ← MAIN ILLUSTRATION
--capy-at-desk-image: url('images/capy-at-desk.png');             ← LOGIN PAGES
--terms-capy-image: url('images/capy-with-magnifying-glass.png'); ← TERMS PAGE
--admin-capy-image: url('images/admin-capy-headset.png');         ← ADMIN LOGIN
--angry-capy-image: url('images/angry-capy.png');                 ← ADMIN SIGNUP
```

### **CSS Comments Added**
I've added helpful comments throughout the CSS file:
- **Line 78**: `/* TO ADD LOGO: Place your logo file in 'images/capybara-logo.png' (50x50px recommended) */`
- **Line 155**: `/* TO ADD HERO ICON: Place your hero icon in 'images/hero-capybara.png' (80x80px recommended) */`
- **Line 177**: `/* TO ADD MAIN ILLUSTRATION: Place your image in 'images/capy-with-phone.png' (300x200px recommended) */`
- **Line 311**: `/* TO ADD LOGIN ILLUSTRATION: Place your image in 'images/capy-at-desk.png' (200x150px recommended) */`
- **Line 336**: `/* TO ADD TERMS ILLUSTRATION: Place your image in 'images/capy-with-magnifying-glass.png' (150x150px recommended) */`
- **Line 485**: `/* TO ADD INTEREST IMAGES: Place your images in 'images/' folder with names like 'capy-dancing.png' etc. (120x80px recommended) */`

## 🔍 What You'll See

### **Before Adding Images:**
- Clean colored backgrounds where logos should be
- No emoji placeholders (all removed)
- Gradient backgrounds on illustration areas

### **After Adding Images:**
- Your custom logos will appear automatically
- Images will be properly sized and positioned
- Fallback gradients will show if images don't load

## 💡 Pro Tips

1. **Use PNG files** with transparent backgrounds for logos
2. **Keep file sizes small** - optimize images before uploading
3. **Match the recommended dimensions** for best results
4. **Use descriptive filenames** for easier management
5. **Test on different screen sizes** after uploading

## 🆘 Troubleshooting

**Image not showing?**
- ✅ Check that `images` folder exists
- ✅ Verify exact filename spelling and case
- ✅ Ensure image file isn't corrupted
- ✅ Clear browser cache (Ctrl+F5)

**Wrong size or position?**
- ✅ Check image dimensions match recommendations
- ✅ Consider using different aspect ratio
- ✅ Modify CSS width/height if needed

**Want to use different folder?**
- ✅ Change all `url('images/...)` to `url('your-folder/...)`
- ✅ Update paths consistently in style.css

## 📋 Quick Checklist

- [ ] Created `images` folder in project directory
- [ ] Added main logo: `images/capybara-logo.png`
- [ ] Added hero icon: `images/hero-capybara.png`
- [ ] Added main illustration: `images/capy-with-phone.png`
- [ ] Added login illustration: `images/capy-at-desk.png`
- [ ] Added terms illustration: `images/capy-with-magnifying-glass.png`
- [ ] (Optional) Added admin illustrations
- [ ] (Optional) Added interest category images
- [ ] Tested website in browser
- [ ] Verified all images load correctly

Your CapyCares website is now ready for your custom branding! 🦫✨