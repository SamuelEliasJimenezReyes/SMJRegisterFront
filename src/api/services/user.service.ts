import axiosInstance from "../auth/axiosInstance.ts";
import type { IUserService } from "./Iuser.services.ts";
import type { AuthResponseDto } from "../dtos/auth.dto";
import type { LoginRequestDto, RegisterRequestDto } from "../dtos/users.dto";

export class UserService implements IUserService {
  async registerAsync(dto: RegisterRequestDto): Promise<AuthResponseDto> {
    const result = await axiosInstance.post<AuthResponseDto>("/user/register", dto);
    return result.data;
  }

  async loginAsync(dto: LoginRequestDto): Promise<AuthResponseDto> {
    const result = await axiosInstance.post<AuthResponseDto>("/user/login", dto);
    return result.data;
  }
}
