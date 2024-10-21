import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, LayoutChangeEvent, PixelRatio, StyleSheet, View } from 'react-native';
import { Text } from './ui/text';

interface ContentSliderProps {
    text: string;
}

const ContentSlider: React.FC<ContentSliderProps> = ({ text }) => {
    const [textSlides, setTextSlides] = useState<string[]>([]);
    const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
    const [containerHeight, setContainerHeight] = useState(700);
    const [currentPage, setCurrentPage] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const getFontSize = (size: number) => size / PixelRatio.getFontScale();
    const fontSize = getFontSize(16); // Adjust base font size as needed

    useEffect(() => {
        if (containerWidth > 0 && containerHeight > 0) {
            const slides = splitTextIntoSlides(text, containerWidth, containerHeight);
            setTextSlides(slides);
        }
    }, [text, containerWidth, containerHeight]);

    const splitTextIntoSlides = (text: string, width: number, height: number): string[] => {
        const words = text.split(' ');
        const slides: string[] = [];
        let currentSlide = '';

        // Calculate charsPerSlide based on container dimensions and font size
        const charsPerLine = Math.floor(width / (fontSize * 0.6)); // Approximate character width
        const linesPerSlide = Math.floor(height / (fontSize * 1.5)); // Approximate line height
        const charsPerSlide = charsPerLine * linesPerSlide;

        for (let i = 0; i < words.length; i++) {
            if ((currentSlide + words[i]).length <= charsPerSlide) {
                currentSlide += (currentSlide ? ' ' : '') + words[i];
            } else {
                slides.push(currentSlide.trim());
                currentSlide = words[i];
            }
        }
        if (currentSlide) {
            slides.push(currentSlide.trim());
        }
        return slides;
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={{ width: containerWidth }} className='pt-8  h-[65vh]'>
            <Text style={{ fontSize }}>{item}</Text>
        </View>
    );

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentPage(viewableItems[0].index);
        }
    }).current;

    return (
        <View
            onLayout={(event: LayoutChangeEvent) => {
                const { width, height } = event.nativeEvent.layout;
                setContainerWidth(width);
                setContainerHeight(height);
            }}
            // style={{ height: 400 }}
            className=''
        >
            <FlatList
                ref={flatListRef}
                data={textSlides}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
            <View style={styles.pagination}>
                {textSlides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentPage ? styles.paginationDotActive : null,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});

export default ContentSlider;