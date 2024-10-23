import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Input,
  Textarea,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  ButtonGroup,
  Spinner,
} from '@chakra-ui/react';
import axiosInstance from '../../services/axiosInstance';
import AuthContext from '../../contexts/authContext';
import useQuery from '../../hooks/useQuery';

export default function OneMessagePage() {
  const { user } = useContext(AuthContext);
  const { messageId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data: post, setData: setPost, loading } = useQuery(`/messages/${messageId}`);
  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   axiosInstance.get(`/messages/${messageId}`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, [messageId]);

  const editImage = async (e) => {
    try {
      if (e.target.files.length === 0) return;
      const formData = new FormData();
      formData.append('img', e.target.files[0]);
      const response = await axiosInstance.patch(
        `/messages/${messageId}/image`,
        formData,
      );
      setPost(response.data);
    } catch (error) {
      console.log(error);
      alert(`Ошибка при загрузке изображения: ${error?.response?.data?.text}`);
    }
  };

  const editMessage = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await axiosInstance.patch(
        `/messages/${messageId}`,
        Object.fromEntries(formData),
      );
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert(`Ошибка при редактировании сообщения: ${error?.response?.data?.text}`);
    }
  };

  console.log({ post });

  if (loading) return <Spinner />;

  return (
    <Box p={5}>
      <HStack alignItems="start">
        {isEditing ? (
          <VStack alignItems="start" w="50%">
            <form onSubmit={editMessage}>
              <Input
                placeholder="Название"
                name="title"
                mb={4}
                defaultValue={post?.title}
              />
              <Textarea
                placeholder="Текст (можно оставить пустым)"
                name="body"
                mb={4}
                defaultValue={post?.body}
              />
              <ButtonGroup variant="outline" spacing="6">
                <Button colorScheme="teal" type="submit">
                  Сохранить
                </Button>
                <Button onClick={() => setIsEditing(false)}>Отменить</Button>
              </ButtonGroup>
            </form>
          </VStack>
        ) : (
          <VStack alignItems="start" w="50%">
            <Heading as="h2" size="lg" mb={4}>
              {post?.title}
            </Heading>
            <Text mb={4}>{post?.body}</Text>
            {user?.id === post?.userId && (
              <Button colorScheme="teal" onClick={() => setIsEditing(true)}>
                Редактировать
              </Button>
            )}
          </VStack>
        )}

        <VStack>
          <Box display="flex" justifyContent="center" mb={4}>
            <a href={`/images/${post?.img}`}>
              <Image src={`/images/${post?.img}`} alt={post?.title} maxW="250px" />
            </a>
          </Box>
          {user?.id === post?.userId && (
            <FormControl>
              <Button as={FormLabel} colorScheme="teal" htmlFor="file-edit">
                Заменить картинку
              </Button>
              <input
                type="file"
                id="file-edit"
                onChange={editImage}
                name="img"
                style={{ display: 'none' }}
              />
            </FormControl>
          )}
        </VStack>
      </HStack>
    </Box>
  );
}
