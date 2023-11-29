import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(registerUserDto: CreateAdminDto): Promise<void> {
    await this.adminService.createAdmin(registerUserDto);
  }

  async signIn(email: string, password: string): Promise<{ access_token: string, refresh_token: string, access_role: string }> {
    const admin = await this.adminService.validateAdmin(email, password);

    const payload = { id: admin.id, email: admin.email, role: admin.role, username: admin.username };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = this.jwtService.sign({ sub: admin.id });
    // saveRefreshToken(admin.id, refresh_token); // Simpan refresh token di database
    
    const access_role = admin.role;
    return {
      access_token,
      refresh_token,
      access_role
    };
  }

  // async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
  //   try {
  //     // Validasi refresh token
  //     const decoded = this.jwtService.verify(refreshToken);

  //     // Lakukan logika validasi tambahan jika diperlukan
  //     const userId = decoded.sub;
  //     const user = await this.sService.findById(userId);

  //     // Cek apakah pengguna masih aktif
  //     if (!user.isActive) {
  //       throw new UnauthorizedException('User not active');
  //     }

  //     // Cek apakah refresh token telah melewati batasan waktu tertentu
  //     if (this.isRefreshTokenExpired(decoded)) {
  //       throw new UnauthorizedException('Refresh token expired');
  //     }

  //     // Jika valid, hasilkan token akses baru
  //     const newAccessToken = await this.generateAccessToken(userId);

  //     return { access_token: newAccessToken };
  //   } catch (error) {
  //     // Tangani kesalahan validasi refresh token
  //     console.error(error);
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  // private isRefreshTokenExpired(decoded: any): boolean {
  //   // Tambahkan logika untuk memeriksa apakah refresh token telah kadaluwarsa
  //   const expirationTime = decoded.exp * 1000; // konversi detik ke milidetik
  //   const currentTime = Date.now();
  //   return expirationTime < currentTime;
  // }
}
