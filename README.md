
# Application
- How to using the boilerplate
npx react-native@latest init ProjectName --template https://github.com/Datpt2508/Boilerplate

## Code structure

- scripts
- src
    - **base** : Thư mục chứa các base custom của dự án nếu cần: button, alert, text, modal, chips, divider.......
    - **contextStore** : thư mục chứa các context store và các action
    - **dummyData**: thư mục chứa các file fake data
    - **hooks**: chứa các hooks xử lí logic cho xuyên suốt app.
    - **libs** : chứa các file xử lí một vấn đề nào đó hoặc custom lại library theo yêu cầu của dự án
    - **navigation**: thư mục chứa tất cả các setting navigation. cấu trúc sẽ được liệt kê các navigation chính sẽ thuộc *BottomTabNavigation*. *BottomTabNavigation* sẽ thuộc *RootNavigation*. các màn hình khác sẽ được liệt kê và định nghĩa ngay tại *RootNavigation*. khi sử dụng navigation.navigate thì cần import thêm type của RootNavigation.
    - **resources**: chứa các file khác của dự án như Font, Icon, image, translate và theme.
        - *Font*: thêm font muốn dùng vào xoá font hiện tại đang có trong folder và chạy lệnh:  Lưu ý có thể thay đổi đường dẫn nhận font tại *reat-navitve.config.js* ở ngoài root folder
        `yarn react-native-asset or npx react-native-asset`
        
        - *Icons*: thư mục chứa các icon của dự án được sử dụng ở code dạng SVG. Để sử dụng thì copy SVG file design và vào [SVG-Transform](https://transform.tools/svg-to-react-native) lấy phần code ở giữa 2 thẻ <SVG> </SVG>. Sử dụng file SVG ở các màn hình khác bằng cách import file và có thể đặt kích thước cùng màu như ví dụ sau:  `<IconExample height={12} width={12} colors={'red'}>`.
        - *images*: thư mục chứa các file ảnh lưu ở trên app, lưu ý khi thêm ảnh vào dự án phải có đầy đủ size @1x, @2x, @3x. [Image IOS](https://stackoverflow.com/questions/30049544/what-should-image-sizes-be-at-1x-2x-and-3x-in-xcode). Để sử dụng image nhanh và dễ cho việc maintain sau này, code đang sử dụng libs getImage. cách sử dụng là sẽ khai báo tên ảnh ở trong file getImage.ts
        - *locales*
    - **screens**
        - *modal*:
        Cách sử dụng modal ui trong project:
        - Ui của modal được viết trong folder src/component/ModalComponent
        - Để khai báo modal sử dụng 1 hook đã được custom lại là `useModalManager` trong folder hook. Ta khai báo tên type của modal ở `SupportedModal` trong file `useModalManager`.
        - Để open hoặc close modal ta phải khai báo trong báo trong file modal ui với `const { isOpen, closeModal } = useModalManager('Tên Modal');`
        - Để open modal để sử dụng ở các màn khác nhau ta khai báo function có chứa `openModal('Tên modal')`
    - *navigation*:
        Cách sử dụng naviagation screen trong project:
        - Hiện có 2 nơi khai báo navigation: Khai báo ở file RootNavigator cho những screen dùng chung hoặc khai báo ở các navigation con `(ExploreNavigator, FeatureNavigator,...)`
        - Để khai báo 1 navigation sceen ta khai báo type trong `RootNavigatorProps` rồi thêm 1 StackNavigator.Screen với tên đã khai báo type ở trên vào `StackNavigator.Navigator`.
        - Để navigate đến 1 screen ta khai báo navigation trong hook `useNavigation`, rồi để navigate vào function muốn gọi đến với cú pháp `navigation.navigate('Tên màn cần đến)`
    - *Mutil language*: Cách config mutil language trong project
    - Khai báo thẻ t với 1 hook đã có sẵn `const  { t } = useTranslation()`;
    - Bọc thẻ t vào các t cần dịch `t('Từ dịch')`
    - Chạy lệnh `yarn extract-translation` để render các từ đã bọc ra file json
    - Sau khi chạy lệnh các từ đã được render theo từng ngôn ngữ trong file json trong folder `resources/locales`, vào các file json đó dịch từng từ theo ngôn ngữ phù hợp.

    
    - **types**: 
    - **utils** 



